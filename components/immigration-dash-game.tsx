"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import NextImage from "next/image";
import { Copy, Share2 } from "lucide-react";

const GAME_URL = "https://thaivisachecklist.com/immigration-dash";
const SHARE_URL_TEXT = "thaivisachecklist.com/immigration-dash";
const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 420;
const GROUND_DRAW_TOP = 338;
const GROUND_TILE_HEIGHT = 92;
const GROUND_SURFACE_Y = GROUND_DRAW_TOP + 36;
const PLAYER_X = 420;
const PLAYER_DRAW_WIDTH = 112;
const PLAYER_DRAW_HEIGHT = 112;
const PLAYER_HITBOX = { x: 31, y: 17, w: 50, h: 88 };
const FORCE_SINGLE_FRAME_PLAYER = true;
const FAIL_ZONE_WIDTH = 110;
const GRAVITY = 1800;
const JUMP_VELOCITY = -760;
const FALL_DEATH_Y = CANVAS_HEIGHT + 120;
const GOLDEN_STAMP_SRC = "/golden-stamp.png?v=2";
const RED_STAMP_SRC = "/red-stamp.png";
const BG_SKY_SRC = "/background-sky.png";
const BG_CITY_SRC = "/background-city.png";
const GROUND_SRC = "/ground-nogaps.png?v=2";
const THAI_BLOCK_SRC = "/thai-block.png";
const SKY_SCROLL_FACTOR = 0.02;
const CITY_SCROLL_FACTOR = 0.04;
const SKY_ZOOM = 1.12;
const CITY_ZOOM = 1.08;
const SKY_ANCHOR_BOTTOM = CANVAS_HEIGHT + 78;
const CITY_ANCHOR_BOTTOM = CANVAS_HEIGHT + 168;
const THAI_BLOCK_BONUS_STAMP_SIZE = 40;
const CLOSED_SIGN_WIDTH = 88;
const CLOSED_SIGN_HEIGHT = 80;
const POTHOLE_COLLISION_INSET = 2;
const POTHOLE_MIN_WIDTH = 96;
const POTHOLE_MAX_WIDTH = 138;

type GameStatus = "idle" | "running" | "gameover";
type ObstacleKind = "closed-sign" | "missing-photocopy" | "thai-block" | "pothole";

type FrameRect = { x: number; y: number; w: number; h: number };
type SpriteAsset = {
  image: HTMLImageElement;
  bounds: FrameRect;
};

type LoadedAssets = {
  sky: HTMLImageElement;
  city: HTMLImageElement;
  ground: SpriteAsset;
  player: HTMLImageElement;
  playerFrames: FrameRect[];
  playerMaxH: number;
  closedSign: SpriteAsset;
  thaiBlock: SpriteAsset;
  missingPhotocopy: SpriteAsset;
  greenStamp: SpriteAsset;
};

type ObstacleEntity = {
  id: number;
  kind: ObstacleKind;
  x: number;
  y: number;
  w: number;
  h: number;
};

type CollectibleEntity = {
  id: number;
  x: number;
  y: number;
  size: number;
  collectedTimer?: number;
};

type GameModel = {
  elapsed: number;
  lives: number;
  documents: number;
  playerOffsetX: number;
  playerPushTargetX: number;
  playerY: number;
  playerVy: number;
  onGround: boolean;
  invulnerability: number;
  blockedTimer: number;
  failZoneX: number;
  worldScroll: number;
  milestoneReached: boolean;
  obstacles: ObstacleEntity[];
  collectibles: CollectibleEntity[];
  nextObstacleIn: number;
  nextCollectibleIn: number;
  nextObstacleId: number;
  nextCollectibleId: number;
  lastObstacleKind: ObstacleKind | null;
  lastObstacleStreak: number;
  lastCollectibleLane: number;
  obstaclesSincePothole: number;
  fallingInPothole: boolean;
};

const GAME_OVER_MESSAGES = [
  "Missing photocopy. Please come back tomorrow.",
  "Need TM30.",
  "Immigration closed for lunch.",
  "Missed your queue. Please take a new number.",
  "Wrong form. Please apply again.",
];
const POTHOLE_GAME_OVER_MESSAGES = [
  "Watch your step. Fell into a pothole.",
  "Bangkok footpath got you.",
  "You fell into a pothole.",
];

function randomRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function lerp(min: number, max: number, t: number) {
  return min + (max - min) * t;
}

function pickRandom<T>(items: readonly T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function intersects(a: { x: number; y: number; w: number; h: number }, b: { x: number; y: number; w: number; h: number }) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function createImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

function extractForegroundBounds(img: HTMLImageElement, region?: FrameRect): FrameRect {
  const offscreen = document.createElement("canvas");
  offscreen.width = img.width;
  offscreen.height = img.height;
  const ctx = offscreen.getContext("2d");
  if (!ctx) return region ?? { x: 0, y: 0, w: img.width, h: img.height };
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, offscreen.width, offscreen.height).data;

  const rx = region?.x ?? 0;
  const ry = region?.y ?? 0;
  const rw = region?.w ?? offscreen.width;
  const rh = region?.h ?? offscreen.height;

  let minX = rx + rw;
  let minY = ry + rh;
  let maxX = 0;
  let maxY = 0;
  let found = false;

  for (let y = ry; y < ry + rh; y += 1) {
    for (let x = rx; x < rx + rw; x += 1) {
      const i = (y * offscreen.width + x) * 4;
      const a = data[i + 3];
      if (a < 24) continue;

      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const sat = max === 0 ? 0 : (max - min) / max;
      const channelDiff = Math.abs(r - g) + Math.abs(g - b) + Math.abs(r - b);

      // Keep solid subject pixels, ignore soft glow backdrop around the assets.
      const isForeground = a >= 235 || (a >= 180 && (sat > 0.16 || channelDiff > 36));
      if (!isForeground) continue;

      found = true;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  if (!found) return region ?? { x: 0, y: 0, w: img.width, h: img.height };

  const pad = 3;
  const x = Math.max(rx, minX - pad);
  const y = Math.max(ry, minY - pad);
  const right = Math.min(rx + rw - 1, maxX + pad);
  const bottom = Math.min(ry + rh - 1, maxY + pad);
  return { x, y, w: right - x + 1, h: bottom - y + 1 };
}

function extractAlphaBounds(img: HTMLImageElement, region?: FrameRect, alphaThreshold = 140): FrameRect | null {
  const offscreen = document.createElement("canvas");
  offscreen.width = img.width;
  offscreen.height = img.height;
  const ctx = offscreen.getContext("2d");
  if (!ctx) return null;
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, offscreen.width, offscreen.height).data;

  const rx = region?.x ?? 0;
  const ry = region?.y ?? 0;
  const rw = region?.w ?? offscreen.width;
  const rh = region?.h ?? offscreen.height;

  let minX = rx + rw;
  let minY = ry + rh;
  let maxX = -1;
  let maxY = -1;
  let found = false;

  for (let y = ry; y < ry + rh; y += 1) {
    for (let x = rx; x < rx + rw; x += 1) {
      const i = (y * offscreen.width + x) * 4;
      const a = data[i + 3];
      if (a < alphaThreshold) continue;
      found = true;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  if (!found) return null;
  const pad = 2;
  const x = Math.max(rx, minX - pad);
  const y = Math.max(ry, minY - pad);
  const right = Math.min(rx + rw - 1, maxX + pad);
  const bottom = Math.min(ry + rh - 1, maxY + pad);
  return { x, y, w: right - x + 1, h: bottom - y + 1 };
}

function extractPlayerFrames(img: HTMLImageElement, expectedFrames = 5): FrameRect[] {
  if (FORCE_SINGLE_FRAME_PLAYER) {
    const fullFrame = extractAlphaBounds(img, undefined, 120);
    if (fullFrame) return [fullFrame];
    return [extractForegroundBounds(img)];
  }

  const frameWidth = Math.floor(img.width / expectedFrames);
  const frames = Array.from({ length: expectedFrames }, (_, i) => {
    const x = i * frameWidth;
    const w = i === expectedFrames - 1 ? img.width - x : frameWidth;
    return extractAlphaBounds(img, { x, y: 0, w, h: img.height }, 150);
  }).filter((frame): frame is FrameRect => !!frame && frame.w >= 26 && frame.h >= 40);

  if (frames.length > 0) return frames;

  const fallback = extractAlphaBounds(img, undefined, 120);
  if (fallback) return [fallback];

  return [extractForegroundBounds(img)];
}

function getMaxFrameSize(frames: FrameRect[]) {
  let maxW = 1;
  let maxH = 1;
  for (const frame of frames) {
    if (frame.w > maxW) maxW = frame.w;
    if (frame.h > maxH) maxH = frame.h;
  }
  return { maxW, maxH };
}

function getDifficulty(timeSeconds: number) {
  const t = Math.min(1, Math.max(0, timeSeconds / 90));
  const ramp = 1 - (1 - t) ** 1.25;

  return {
    speed: lerp(300, 560, ramp),
    obstacleMin: lerp(1.1, 0.34, ramp),
    obstacleMax: lerp(1.6, 0.62, ramp),
    collectibleMin: lerp(1.9, 0.62, ramp),
    collectibleMax: lerp(2.6, 1.08, ramp),
    closedChance: lerp(0.12, 0.21, ramp),
    blockChance: lerp(0.52, 0.36, ramp),
    potholeChance: lerp(0.11, 0.22, ramp),
    collectibleBurstChance: lerp(0.32, 0.74, ramp),
    collectibleAlongsideObstacleChance: lerp(0.1, 0.55, ramp),
    nonPotholeMinGap: lerp(175, 112, ramp),
  };
}

function createInitialModel(): GameModel {
  return {
    elapsed: 0,
    lives: 3,
    documents: 0,
    playerOffsetX: 0,
    playerPushTargetX: 0,
    playerY: GROUND_SURFACE_Y - PLAYER_DRAW_HEIGHT,
    playerVy: 0,
    onGround: true,
    invulnerability: 0,
    blockedTimer: 0,
    failZoneX: -FAIL_ZONE_WIDTH,
    worldScroll: 0,
    milestoneReached: false,
    obstacles: [],
    collectibles: [],
    nextObstacleIn: 0.45,
    nextCollectibleIn: 0.1,
    nextObstacleId: 1,
    nextCollectibleId: 1,
    lastObstacleKind: null,
    lastObstacleStreak: 0,
    lastCollectibleLane: -1,
    obstaclesSincePothole: 0,
    fallingInPothole: false,
  };
}

function pickSpawnX(model: GameModel, minOffset: number, maxOffset: number, minGap: number) {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const x = CANVAS_WIDTH + randomRange(minOffset, maxOffset + attempt * 35);
    const nearObstacle = model.obstacles.some(
      (obstacle) => obstacle.x > CANVAS_WIDTH - 220 && Math.abs(obstacle.x - x) < minGap
    );
    const nearCollectible = model.collectibles.some(
      (collectible) => collectible.x > CANVAS_WIDTH - 220 && Math.abs(collectible.x - x) < minGap
    );
    if (!nearObstacle && !nearCollectible) return x;
  }
  return CANVAS_WIDTH + randomRange(maxOffset + minGap * 0.4, maxOffset + minGap * 1.1);
}

function easeToward(current: number, target: number, rate: number, delta: number) {
  const t = Math.min(1, rate * delta);
  return current + (target - current) * t;
}

function drawParallaxLayer(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  scroll: number,
  speedFactor: number,
  zoom: number,
  anchorBottom: number
) {
  const baseScale = Math.max(CANVAS_WIDTH / image.width, CANVAS_HEIGHT / image.height);
  const scale = baseScale * zoom;
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const dy = Math.floor(anchorBottom - drawHeight);

  if (drawWidth <= 0) return;

  // Use image + mirrored image strip to keep motion continuous without jump.
  const stripWidth = drawWidth * 2;
  const drift = ((scroll * speedFactor) % stripWidth + stripWidth) % stripWidth;

  for (let x = -drift - stripWidth; x < CANVAS_WIDTH + stripWidth; x += stripWidth) {
    ctx.drawImage(image, x, dy, drawWidth, drawHeight);

    ctx.save();
    ctx.translate(x + drawWidth * 2, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(image, 0, dy, drawWidth, drawHeight);
    ctx.restore();
  }
}

function drawGroundLayer(ctx: CanvasRenderingContext2D, assets: LoadedAssets, scroll: number, potholes: ObstacleEntity[]) {
  const src = assets.ground.bounds;
  const drawY = GROUND_DRAW_TOP;
  const drawH = GROUND_TILE_HEIGHT;
  const tileW = (src.w / src.h) * drawH;
  const offset = -((scroll % tileW) + tileW) % tileW;
  const visiblePotholes = potholes
    .map((pothole) => ({
      x: Math.floor(pothole.x),
      w: Math.max(18, Math.floor(pothole.w)),
    }))
    .filter((p) => p.x + p.w > -2 && p.x < CANVAS_WIDTH + 2);

  ctx.save();
  // Clip ground rendering to the ground band minus pothole gaps.
  ctx.beginPath();
  ctx.rect(0, drawY, CANVAS_WIDTH, drawH);
  for (const gap of visiblePotholes) {
    ctx.rect(gap.x, drawY - 1, gap.w, drawH + 2);
  }
  ctx.clip("evenodd");

  for (let x = offset - tileW; x < CANVAS_WIDTH + tileW; x += tileW) {
    // Snap each tile edge independently so adjacent tiles always meet/overlap by <= 1px.
    const left = Math.floor(x);
    const right = Math.ceil(x + tileW);
    const drawW = Math.max(1, right - left);
    ctx.drawImage(assets.ground.image, src.x, src.y, src.w, src.h, left, drawY, drawW, drawH);
  }
  ctx.restore();
}

function drawPlayer(ctx: CanvasRenderingContext2D, assets: LoadedAssets, model: GameModel) {
  const frameCount = assets.playerFrames.length;
  const runningIndex = FORCE_SINGLE_FRAME_PLAYER
    ? 0
    : (() => {
        const forward = Array.from({ length: frameCount }, (_, i) => i);
        const backward = Array.from({ length: Math.max(0, frameCount - 2) }, (_, i) => frameCount - 2 - i);
        const sequence = [...forward, ...backward];
        return sequence[Math.floor(model.elapsed * 12) % sequence.length] ?? 0;
      })();
  const frame = assets.playerFrames[runningIndex] ?? assets.playerFrames[0];
  const alphaBlink = model.invulnerability > 0 && Math.floor(model.elapsed * 14) % 2 === 0;
  const scale = Math.min(PLAYER_DRAW_WIDTH / frame.w, PLAYER_DRAW_HEIGHT / frame.h);
  const drawW = frame.w * scale;
  const drawH = frame.h * scale;
  const dx = PLAYER_X + model.playerOffsetX + (PLAYER_DRAW_WIDTH - drawW) / 2;
  const dy = model.playerY + (PLAYER_DRAW_HEIGHT - drawH);

  ctx.save();
  if (alphaBlink) ctx.globalAlpha = 0.45;
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(
    assets.player,
    frame.x,
    frame.y,
    frame.w,
    frame.h,
    dx,
    dy,
    drawW,
    drawH
  );
  ctx.restore();
}

function drawObstacle(ctx: CanvasRenderingContext2D, assets: LoadedAssets, obstacle: ObstacleEntity) {
  if (obstacle.kind === "pothole") return;
  const sprite =
    obstacle.kind === "closed-sign"
      ? assets.closedSign
      : obstacle.kind === "thai-block"
        ? assets.thaiBlock
        : assets.missingPhotocopy;
  const source = sprite.bounds;
  ctx.drawImage(sprite.image, source.x, source.y, source.w, source.h, obstacle.x, obstacle.y, obstacle.w, obstacle.h);
}

function drawCollectible(ctx: CanvasRenderingContext2D, assets: LoadedAssets, collectible: CollectibleEntity) {
  if ((collectible.collectedTimer ?? 0) > 0) {
    const t = collectible.collectedTimer ?? 0;
    const pulse = Math.max(0, Math.min(1, t / 0.18));
    ctx.save();
    ctx.globalAlpha = 0.45 + Math.sin(t * 90) * 0.35;
    ctx.fillStyle = "rgba(253, 224, 71, 0.85)";
    ctx.beginPath();
    ctx.arc(
      collectible.x + collectible.size / 2,
      collectible.y + collectible.size / 2,
      collectible.size * (0.52 + pulse * 0.38),
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.restore();
    return;
  }

  const source = assets.greenStamp.bounds;

  const glow = ctx.createRadialGradient(
    collectible.x + collectible.size / 2,
    collectible.y + collectible.size / 2,
    3,
    collectible.x + collectible.size / 2,
    collectible.y + collectible.size / 2,
    collectible.size * 0.8
  );
  glow.addColorStop(0, "rgba(34, 197, 94, 0.45)");
  glow.addColorStop(1, "rgba(34, 197, 94, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(
    collectible.x + collectible.size / 2,
    collectible.y + collectible.size / 2,
    collectible.size * 0.7,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.drawImage(
    assets.greenStamp.image,
    source.x,
    source.y,
    source.w,
    source.h,
    collectible.x,
    collectible.y,
    collectible.size,
    collectible.size
  );
}

function drawCanvasHud(ctx: CanvasRenderingContext2D, model: GameModel) {
  const score = Math.max(0, Math.floor(model.elapsed * 15 + model.documents * 150));
  const lives = model.lives;
  const time = Math.floor(model.elapsed);

  ctx.save();
  ctx.fillStyle = "#fde047";
  ctx.textBaseline = "top";
  ctx.font = "700 21px 'Trebuchet MS', 'Segoe UI', Arial, sans-serif";
  ctx.shadowColor = "rgba(0, 0, 0, 0.55)";
  ctx.shadowBlur = 2;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 1;

  const labels = [
    `SCORE: ${score}`,
    `LIVES: ${lives}`,
    `TIME: ${time}s`,
  ];
  const slots = [30, 330, 620];

  labels.forEach((text, i) => {
    const x = slots[i] ?? 30;
    const y = 14;
    ctx.fillText(text, x, y);
  });

  ctx.restore();
}

export default function ImmigrationDashGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const modelRef = useRef<GameModel>(createInitialModel());
  const assetsRef = useRef<LoadedAssets | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const lastHudSyncRef = useRef(0);

  const [status, setStatus] = useState<GameStatus>("idle");
  const [assetsReady, setAssetsReady] = useState(false);
  const [assetError, setAssetError] = useState<string | null>(null);
  const [gameOverMessage, setGameOverMessage] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [shareState, setShareState] = useState<"idle" | "shared" | "error">("idle");
  const [hud, setHud] = useState({
    score: 0,
    lives: 3,
    time: 0,
    blocked: false,
    milestoneReached: false,
  });

  const pushHud = useCallback(() => {
    const model = modelRef.current;
    setHud({
      score: Math.max(0, Math.floor(model.elapsed * 15 + model.documents * 150)),
      lives: model.lives,
      time: model.elapsed,
      blocked: model.blockedTimer > 0,
      milestoneReached: model.milestoneReached,
    });
  }, []);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const assets = assetsRef.current;
    if (!canvas || !assets) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const model = modelRef.current;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawParallaxLayer(ctx, assets.sky, model.worldScroll, SKY_SCROLL_FACTOR, SKY_ZOOM, SKY_ANCHOR_BOTTOM);
    drawParallaxLayer(ctx, assets.city, model.worldScroll, CITY_SCROLL_FACTOR, CITY_ZOOM, CITY_ANCHOR_BOTTOM);
    drawGroundLayer(
      ctx,
      assets,
      model.worldScroll,
      model.obstacles.filter((obstacle) => obstacle.kind === "pothole")
    );
    model.collectibles.forEach((item) => drawCollectible(ctx, assets, item));
    model.obstacles.forEach((obstacle) => drawObstacle(ctx, assets, obstacle));
    drawPlayer(ctx, assets, model);
    drawCanvasHud(ctx, model);
  }, []);

  const stopLoop = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    lastTimeRef.current = 0;
    lastHudSyncRef.current = 0;
  }, []);

  const endGame = useCallback((message?: string) => {
    setStatus("gameover");
    setCopyState("idle");
    setShareState("idle");
    setGameOverMessage(message ?? pickRandom(GAME_OVER_MESSAGES));
    pushHud();
    stopLoop();
  }, [pushHud, stopLoop]);

  const spawnThaiBlockJumpStamps = useCallback((blockX: number, blockY: number, blockW: number) => {
    const model = modelRef.current;
    const baseX = blockX + blockW + randomRange(20, 36);
    const baseY = blockY - randomRange(44, 72);
    const stepX = randomRange(42, 74);
    const riseStep = randomRange(8, 26);
    const roll = Math.random();
    const count = roll < 0.45 ? 1 : roll < 0.82 ? 2 : 3;

    for (let i = 0; i < count; i += 1) {
      const target = {
        x: baseX + i * stepX + randomRange(-10, 12),
        y: Math.max(32, baseY - i * riseStep + randomRange(-10, 8)),
      };
      const crowded = model.collectibles.some(
        (item) => Math.abs(item.x - target.x) < 52 && Math.abs(item.y - target.y) < 44
      );
      if (crowded) continue;

      model.collectibles.push({
        id: model.nextCollectibleId,
        x: target.x,
        y: target.y,
        size: THAI_BLOCK_BONUS_STAMP_SIZE,
      });
      model.nextCollectibleId += 1;
    }
  }, []);

  const spawnObstacle = useCallback(() => {
    const model = modelRef.current;
    const d = getDifficulty(model.elapsed);
    const roll = Math.random();
    const potholesAllowed = model.elapsed > 8;
    const forcePothole = potholesAllowed && model.elapsed > 10 && model.obstaclesSincePothole >= 6;
    let kind: ObstacleKind =
      forcePothole || roll < d.potholeChance
        ? "pothole"
        : roll < d.potholeChance + d.closedChance
        ? "closed-sign"
        : roll < d.potholeChance + d.closedChance + d.blockChance
          ? "thai-block"
          : "missing-photocopy";

    if (!potholesAllowed && kind === "pothole") {
      // Keep first seconds fair: no instant-death pits until player is moving.
      kind = roll < 0.5 ? "thai-block" : "missing-photocopy";
    }

    if (kind === model.lastObstacleKind && model.lastObstacleStreak >= 2) {
      const alternatives = (["closed-sign", "thai-block", "missing-photocopy", "pothole"] as ObstacleKind[]).filter(
        (candidate) => candidate !== kind
      );
      kind = pickRandom(alternatives);
    }

    if (kind === model.lastObstacleKind) {
      model.lastObstacleStreak += 1;
    } else {
      model.lastObstacleKind = kind;
      model.lastObstacleStreak = 1;
    }
    model.obstaclesSincePothole = kind === "pothole" ? 0 : model.obstaclesSincePothole + 1;

    const obstacle =
      kind === "closed-sign"
        ? { w: CLOSED_SIGN_WIDTH, h: CLOSED_SIGN_HEIGHT, y: GROUND_SURFACE_Y - CLOSED_SIGN_HEIGHT }
        : kind === "thai-block"
          ? { w: 64, h: 64, y: GROUND_SURFACE_Y - 124 }
          : kind === "pothole"
            ? {
                w: randomRange(POTHOLE_MIN_WIDTH, POTHOLE_MAX_WIDTH),
                h: 22,
                y: GROUND_SURFACE_Y - 10,
              }
            : { w: 44, h: 44, y: GROUND_SURFACE_Y - 44 };

    const earlySpawn = model.elapsed < 2.5;
    const spawnX =
      kind === "pothole"
        ? pickSpawnX(model, 240, 420, 240)
        : earlySpawn
          ? pickSpawnX(model, -14, 96, 180)
          : pickSpawnX(model, 16, 260, d.nonPotholeMinGap);

    model.obstacles.push({
      id: model.nextObstacleId,
      kind,
      x: spawnX,
      y: obstacle.y,
      w: obstacle.w,
      h: obstacle.h,
    });
    model.nextObstacleId += 1;

    if (kind === "thai-block" && Math.random() < 0.85) {
      spawnThaiBlockJumpStamps(spawnX, obstacle.y, obstacle.w);
    }
  }, [spawnThaiBlockJumpStamps]);

  const spawnCollectible = useCallback(() => {
    const model = modelRef.current;
    const d = getDifficulty(model.elapsed);
    const size = 46;
    const lanes = [0, 28, 52, 82, 112];
    let laneIndex = Math.floor(Math.random() * lanes.length);
    if (laneIndex === model.lastCollectibleLane && Math.random() < 0.75) {
      laneIndex = (laneIndex + 1 + Math.floor(Math.random() * (lanes.length - 1))) % lanes.length;
    }
    model.lastCollectibleLane = laneIndex;

    const baseY = Math.max(42, GROUND_SURFACE_Y - size - (lanes[laneIndex] + randomRange(-10, 10)));
    const earlySpawn = model.elapsed < 2.5;
    const spawnX = earlySpawn
      ? pickSpawnX(model, -70, 120, 160)
      : pickSpawnX(model, -20, 340, 145);

    const burstRoll = Math.random();
    let burstCount = 1;
    if (burstRoll < d.collectibleBurstChance) {
      const megaChance = Math.min(0.24, model.elapsed / 220);
      burstCount = Math.random() < megaChance ? 4 : Math.random() < 0.55 ? 2 : 3;
    }

    for (let i = 0; i < burstCount; i += 1) {
      const x = spawnX + i * randomRange(42, 68) + randomRange(-6, 8);
      const y = Math.max(36, baseY - i * randomRange(4, 14) + randomRange(-6, 6));
      const crowded = model.collectibles.some((item) => Math.abs(item.x - x) < 48 && Math.abs(item.y - y) < 40);
      if (crowded) continue;

      model.collectibles.push({
        id: model.nextCollectibleId,
        x,
        y,
        size,
      });
      model.nextCollectibleId += 1;
    }
  }, []);

  const updateGame = useCallback(
    (delta: number) => {
      const model = modelRef.current;
      const prevPlayerBottom = model.playerY + PLAYER_HITBOX.y + PLAYER_HITBOX.h;
      model.elapsed += delta;
      const d = getDifficulty(model.elapsed);

      if (!model.milestoneReached && model.elapsed >= 60) {
        model.milestoneReached = true;
      }

      model.nextObstacleIn -= delta;
      let spawnedObstacleThisTick = false;
      if (model.nextObstacleIn <= 0) {
        spawnObstacle();
        spawnedObstacleThisTick = true;
        model.nextObstacleIn = randomRange(d.obstacleMin, d.obstacleMax);
        if (model.nextCollectibleIn < 0.42) {
          model.nextCollectibleIn = 0.42 + randomRange(0.06, 0.18);
        }
      }

      model.nextCollectibleIn -= delta;
      const canSpawnAlongsideObstacle =
        spawnedObstacleThisTick && Math.random() < d.collectibleAlongsideObstacleChance;
      if (model.nextCollectibleIn <= 0 && (!spawnedObstacleThisTick || canSpawnAlongsideObstacle)) {
        spawnCollectible();
        model.nextCollectibleIn = randomRange(d.collectibleMin, d.collectibleMax);
        if (model.nextObstacleIn < 0.36) {
          model.nextObstacleIn = 0.36 + randomRange(0.06, 0.16);
        }
      }

      model.invulnerability = Math.max(0, model.invulnerability - delta);
      model.blockedTimer = Math.max(0, model.blockedTimer - delta);

      const blocked = model.blockedTimer > 0;
      const speedMultiplier = blocked ? 0.22 : 1;
      const worldSpeed = d.speed * speedMultiplier;

      model.worldScroll += worldSpeed * delta;

      model.playerVy += GRAVITY * delta;
      model.playerY += model.playerVy * delta;

      if (blocked) {
        model.failZoneX = Math.min(CANVAS_WIDTH, model.failZoneX + 96 * delta);
      } else {
        model.failZoneX = Math.max(-FAIL_ZONE_WIDTH, model.failZoneX - 120 * delta);
      }

      model.obstacles.forEach((o) => {
        o.x -= worldSpeed * delta;
      });
      model.collectibles.forEach((c) => {
        c.x -= d.speed * 1.05 * delta;
      });

      model.obstacles = model.obstacles.filter((o) => o.x + o.w > -140);
      model.collectibles = model.collectibles
        .map((item) => {
          if ((item.collectedTimer ?? 0) > 0) {
            return { ...item, collectedTimer: Math.max(0, (item.collectedTimer ?? 0) - delta) };
          }
          return item;
        })
        .filter((item) => {
          if (item.collectedTimer !== undefined) return (item.collectedTimer ?? 0) > 0;
          return item.x + item.size > -140;
        });

      const feetLeft = PLAYER_X + model.playerOffsetX + PLAYER_HITBOX.x + 6;
      const feetRight = PLAYER_X + model.playerOffsetX + PLAYER_HITBOX.x + PLAYER_HITBOX.w - 6;
      const overPothole = model.obstacles.some(
        (obstacle) =>
          obstacle.kind === "pothole" &&
          feetRight > obstacle.x + POTHOLE_COLLISION_INSET &&
          feetLeft < obstacle.x + obstacle.w - POTHOLE_COLLISION_INSET
      );

      if (model.fallingInPothole) {
        // Once the player drops in, do not allow recovery onto ground/platforms.
        model.onGround = false;
        model.playerVy = Math.max(model.playerVy, 260);
      } else if (model.playerY >= GROUND_SURFACE_Y - PLAYER_DRAW_HEIGHT) {
        if (overPothole) {
          // Enter pothole fall state.
          model.fallingInPothole = true;
          model.onGround = false;
          model.playerVy = Math.max(model.playerVy, 260);
        } else {
          model.playerY = GROUND_SURFACE_Y - PLAYER_DRAW_HEIGHT;
          model.playerVy = 0;
          model.onGround = true;
        }
      } else {
        model.onGround = false;
      }

      if (model.playerY > FALL_DEATH_Y) {
        model.lives = 0;
        endGame(pickRandom(POTHOLE_GAME_OVER_MESSAGES));
        return;
      }

      let playerRect = {
        x: PLAYER_X + model.playerOffsetX + PLAYER_HITBOX.x,
        y: model.playerY + PLAYER_HITBOX.y,
        w: PLAYER_HITBOX.w,
        h: PLAYER_HITBOX.h,
      };

      model.collectibles = model.collectibles.filter((item) => {
        if ((item.collectedTimer ?? 0) > 0) return true;
        const rect = {
          x: item.x + 8,
          y: item.y + 8,
          w: item.size - 16,
          h: item.size - 16,
        };
        if (intersects(playerRect, rect)) {
          model.documents += 1;
          item.collectedTimer = 0.18;
          return true;
        }
        return true;
      });

      let pushedBySolidObstacle = false;
      if (!model.fallingInPothole) {
        for (const obstacle of model.obstacles) {
          if (obstacle.kind === "pothole") continue;
          if (obstacle.kind === "thai-block") {
            const topY = obstacle.y + 1;
            const sideInset = 4;
            const topLeft = obstacle.x + sideInset;
            const topRight = obstacle.x + obstacle.w - sideInset;
            const playerBottom = playerRect.y + playerRect.h;
            const playerCenterX = playerRect.x + playerRect.w / 2;
            const overTop = playerCenterX >= topLeft && playerCenterX <= topRight;
            const comingDownOntoTop = model.playerVy >= 0 && prevPlayerBottom <= topY && playerBottom >= topY;
            const standingOnTop = model.playerVy >= 0 && overTop && Math.abs(playerBottom - topY) <= 8;

            if (overTop && (comingDownOntoTop || standingOnTop)) {
              model.playerY = topY - PLAYER_HITBOX.h - PLAYER_HITBOX.y;
              model.playerVy = 0;
              model.onGround = true;
              playerRect = {
                ...playerRect,
                y: model.playerY + PLAYER_HITBOX.y,
              };
            }
            // Thai blocks are platform-only: no side pushback or trapping.
            continue;
          }

          if (obstacle.kind === "closed-sign") {
            const topY = obstacle.y + 2;
            const sideInset = 8;
            const topLeft = obstacle.x + sideInset;
            const topRight = obstacle.x + obstacle.w - sideInset;
            const playerBottom = playerRect.y + playerRect.h;
            const playerCenterX = playerRect.x + playerRect.w / 2;
            const overTop = playerCenterX >= topLeft && playerCenterX <= topRight;
            const comingDownOntoTop = model.playerVy >= 0 && prevPlayerBottom <= topY && playerBottom >= topY;
            const standingOnTop = model.playerVy >= 0 && overTop && Math.abs(playerBottom - topY) <= 8;

            // Closed sign stays solid from above and blocks from the side.
            if (overTop && (comingDownOntoTop || standingOnTop)) {
              model.playerY = topY - PLAYER_HITBOX.h - PLAYER_HITBOX.y;
              model.playerVy = 0;
              model.onGround = true;
              playerRect = {
                ...playerRect,
                y: model.playerY + PLAYER_HITBOX.y,
              };
              continue;
            }

            const bodyRect =
              {
                x: obstacle.x + 10,
                y: obstacle.y + 24,
                w: obstacle.w - 20,
                h: obstacle.h - 24,
              };
            if (!intersects(playerRect, bodyRect)) {
              continue;
            }

            pushedBySolidObstacle = true;
            model.blockedTimer = 0.2;

            const stuckX = obstacle.x - PLAYER_HITBOX.w - PLAYER_HITBOX.x - 6;
            const targetOffset = Math.max(-PLAYER_X + 12, stuckX - PLAYER_X);
            model.playerPushTargetX = targetOffset;
            // Snap to the safe side immediately to avoid jittery side-collision easing.
            model.playerOffsetX = Math.min(model.playerOffsetX, targetOffset);
            break;
          }
          const rect = { x: obstacle.x + 8, y: obstacle.y + 8, w: obstacle.w - 16, h: obstacle.h - 8 };
          if (!intersects(playerRect, rect)) continue;

          if (obstacle.kind === "missing-photocopy" && model.invulnerability <= 0) {
            model.lives -= 1;
            model.invulnerability = 1.1;
            model.obstacles = model.obstacles.filter((o) => o.id !== obstacle.id);
            if (model.lives <= 0) {
              endGame();
              return;
            }
            break;
          }
        }
      }

      if (pushedBySolidObstacle) {
        // Keep the player locked to a single pushed-back offset while colliding.
        model.playerOffsetX = model.playerPushTargetX;
      } else if (model.blockedTimer > 0 && model.playerPushTargetX < 0) {
        // Prevent edge flicker from rapidly toggling between push and release.
        model.playerOffsetX = model.playerPushTargetX;
      } else {
        model.playerPushTargetX = 0;
        model.playerOffsetX = easeToward(model.playerOffsetX, 0, 8.8, delta);
      }

      if (model.failZoneX + FAIL_ZONE_WIDTH >= PLAYER_X + model.playerOffsetX + 8) {
        endGame();
      }
    },
    [endGame, spawnCollectible, spawnObstacle]
  );

  const startGame = useCallback(() => {
    modelRef.current = createInitialModel();
    setStatus("running");
    setCopyState("idle");
    setShareState("idle");
    setGameOverMessage("");
    setHud({
      score: 0,
      lives: 3,
      time: 0,
      blocked: false,
      milestoneReached: false,
    });
    drawFrame();
  }, [drawFrame]);

  const jump = useCallback(() => {
    if (status !== "running") return;
    const model = modelRef.current;
    if (!model.onGround) return;
    model.playerVy = JUMP_VELOCITY;
    model.onGround = false;
  }, [status]);

  useEffect(() => {
    let isCancelled = false;

    async function run() {
      try {
        const [sky, city, ground, player, closedSign, thaiBlock, missingPhotocopy, greenStamp] =
          await Promise.all([
            createImage(BG_SKY_SRC),
            createImage(BG_CITY_SRC),
            createImage(GROUND_SRC),
            createImage("/player-run.png"),
            createImage("/immigration-dash/obstacle-closed-sign.png"),
            createImage(THAI_BLOCK_SRC),
            createImage(RED_STAMP_SRC),
            createImage(GOLDEN_STAMP_SRC),
          ]);

        if (isCancelled) return;

        const playerFrames = extractPlayerFrames(player, 5);
        const playerSize = getMaxFrameSize(playerFrames);
        // This asset is authored without horizontal padding; keep full width for seamless tiling.
        const groundBounds = { x: 0, y: 0, w: ground.width, h: ground.height };

        assetsRef.current = {
          sky,
          city,
          ground: { image: ground, bounds: groundBounds },
          player,
          playerFrames,
          playerMaxH: playerSize.maxH,
          closedSign: {
            image: closedSign,
            bounds: extractAlphaBounds(closedSign, undefined, 208) ?? extractForegroundBounds(closedSign),
          },
          thaiBlock: {
            image: thaiBlock,
            bounds: extractAlphaBounds(thaiBlock, undefined, 160) ?? extractForegroundBounds(thaiBlock),
          },
          missingPhotocopy: {
            image: missingPhotocopy,
            bounds: extractAlphaBounds(missingPhotocopy, undefined, 208) ?? extractForegroundBounds(missingPhotocopy),
          },
          greenStamp: {
            image: greenStamp,
            bounds: extractAlphaBounds(greenStamp, undefined, 208) ?? extractForegroundBounds(greenStamp),
          },
        };

        setAssetsReady(true);
        setAssetError(null);
        drawFrame();
      } catch (error) {
        if (isCancelled) return;
        setAssetsReady(false);
        setAssetError(error instanceof Error ? error.message : "Failed to load game assets.");
      }
    }

    void run();
    return () => {
      isCancelled = true;
    };
  }, [drawFrame]);

  useEffect(() => {
    if (status !== "running") {
      stopLoop();
      drawFrame();
      return;
    }

    const tick = (ts: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = ts;
      const delta = Math.min(0.033, (ts - lastTimeRef.current) / 1000);
      lastTimeRef.current = ts;

      updateGame(delta);
      drawFrame();

      if (ts - lastHudSyncRef.current > 90) {
        pushHud();
        lastHudSyncRef.current = ts;
      }

      if (rafRef.current != null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => stopLoop();
  }, [drawFrame, pushHud, status, stopLoop, updateGame]);

  useEffect(() => {
    const prevent = (event: KeyboardEvent) => {
      if (event.code === "Space" || event.code === "ArrowUp" || event.key === " ") {
        event.preventDefault();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      prevent(event);
      if (event.repeat) return;
      if (event.code === "Space" || event.code === "ArrowUp" || event.key === " ") {
        jump();
      }
    };
    const onKeyUp = (event: KeyboardEvent) => {
      prevent(event);
    };
    window.addEventListener("keydown", onKeyDown, { passive: false, capture: true });
    window.addEventListener("keyup", onKeyUp, { passive: false, capture: true });
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [jump]);

  const resultText = useMemo(() => {
    const seconds = Math.floor(hud.time);
    return `🇹🇭 I survived ${seconds} seconds at Thai Immigration!\nScore: ${hud.score}\n\nPlay here:\n${SHARE_URL_TEXT}`;
  }, [hud.score, hud.time]);

  const canNativeShare = typeof navigator !== "undefined" && "share" in navigator;
  const socialShareText = useMemo(() => {
    const seconds = Math.floor(hud.time);
    return `🇹🇭 I survived ${seconds} seconds at Thai Immigration!\nScore: ${hud.score}`;
  }, [hud.score, hud.time]);
  const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(socialShareText)}&url=${encodeURIComponent(GAME_URL)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(GAME_URL)}&quote=${encodeURIComponent(socialShareText)}`;

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(resultText);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }, [resultText]);

  const onNativeShare = useCallback(async () => {
    if (!canNativeShare) return;
    try {
      await navigator.share({
        title: "Immigration Dash",
        text: resultText,
        url: GAME_URL,
      });
      setShareState("shared");
    } catch {
      setShareState("error");
    }
  }, [canNativeShare, resultText]);

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div>
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Immigration Dash</h2>
          </div>

          <div className="mt-3 rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-50 via-white to-indigo-50 p-3">
            <h3 className="text-sm font-bold text-slate-900">Share your result</h3>
            <p className="mt-1 whitespace-pre-line text-sm text-slate-700">{resultText}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onCopy}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-amber-300 bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-900 hover:bg-amber-200 sm:w-auto sm:text-sm"
              >
                <Copy className="h-4 w-4" /> Copy share message
              </button>
              <button
                type="button"
                onClick={onNativeShare}
                disabled={!canNativeShare}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-violet-300 bg-violet-100 px-3 py-1.5 text-xs font-semibold text-violet-900 hover:bg-violet-200 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:text-sm"
              >
                <Share2 className="h-4 w-4" /> Share
              </button>
              <a
                href={xShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-black sm:w-auto sm:text-sm"
              >
                <NextImage
                  src="/resource-logos/X-logo.svg"
                  alt="X"
                  width={14}
                  height={14}
                  className="h-3.5 w-3.5"
                />
                Share on X
              </a>
              <a
                href={facebookShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#1664d9] bg-[#1877f2] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1664d9] sm:w-auto sm:text-sm"
              >
                <NextImage
                  src="/resource-logos/facebook-logo.svg"
                  alt="Facebook"
                  width={14}
                  height={14}
                  className="h-3.5 w-3.5"
                />
                Share on Facebook
              </a>
            </div>
            {(copyState !== "idle" || shareState !== "idle") && (
              <p className="mt-2 text-xs text-slate-500">
                {copyState === "copied" && "Share message copied to clipboard."}
                {copyState === "error" && "Could not copy automatically. Please copy manually."}
                {shareState === "shared" && "Thanks for sharing."}
                {shareState === "error" && "Sharing was cancelled or unavailable."}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 min-h-[40px]">
          {hud.milestoneReached && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              Visa approved. See you again in 90 days.
            </div>
          )}
        </div>

        <div className="relative mt-4 overflow-hidden rounded-2xl border border-slate-300 bg-slate-100">
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            onPointerDown={jump}
            className="block h-auto w-[145%] max-w-none -translate-x-[15.5%] touch-manipulation select-none sm:w-full sm:translate-x-0"
            aria-label="Immigration Dash game"
          />

          {!assetsReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/35 px-4 text-center text-sm font-semibold text-white">
              {assetError ? `Asset error: ${assetError}` : "Loading game assets..."}
            </div>
          )}

          {assetsReady && status !== "running" && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/25 backdrop-blur-[1px]">
              <div className="mx-4 max-w-md rounded-2xl border border-white/70 bg-white/95 p-4 text-center shadow-lg sm:p-5">
                <h3 className="text-lg font-bold text-slate-900">
                  {status === "idle" ? "Ready to run to immigration?" : "Game over"}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {status === "idle"
                    ? "Space, Up arrow, or tap to jump."
                    : gameOverMessage}
                </p>
                <button
                  type="button"
                  onClick={startGame}
                  className="mt-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:from-fuchsia-700 hover:to-pink-700"
                >
                  {status === "idle" ? "Start Game" : "Restart Game"}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {status === "running" && (
            <button
              type="button"
              onClick={startGame}
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Restart Game
            </button>
          )}
          <p className="text-xs text-slate-500 sm:text-sm">
            Controls: Space or Up arrow on desktop. Tap on mobile.
          </p>
        </div>
        <div className="mt-2 min-h-[32px]">
          <p
            className={`rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 transition-opacity sm:text-sm ${
              hud.blocked ? "opacity-100" : "opacity-0"
            }`}
          >
              Blocked by closed sign. Keep moving or the fail-zone will catch you.
          </p>
        </div>
      </div>

    </div>
  );
}
