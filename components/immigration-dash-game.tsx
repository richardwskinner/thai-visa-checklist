"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import NextImage from "next/image";
import { Copy, Share2 } from "lucide-react";

const GAME_URL = "https://thaivisachecklist.com/games/immigration-dash";
const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 420;
const GROUND_Y = 368;
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

type GameStatus = "idle" | "running" | "gameover";
type ObstacleKind = "closed-sign" | "missing-photocopy" | "pothole";

type FrameRect = { x: number; y: number; w: number; h: number };
type SpriteAsset = {
  image: HTMLImageElement;
  bounds: FrameRect;
};

type BackgroundRenderState = {
  image: HTMLImageElement;
  dx: number;
  dy: number;
  scale: number;
};

type LoadedAssets = {
  background: HTMLImageElement;
  player: HTMLImageElement;
  playerFrames: FrameRect[];
  playerMaxH: number;
  closedSign: SpriteAsset;
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
};

const GAME_OVER_MESSAGES = [
  "Missing photocopy. Please come back tomorrow.",
  "Need TM30.",
  "Immigration closed for lunch.",
  "Missed your queue. Please take a new number.",
  "Wrong form. Please apply again.",
];

function randomRange(min: number, max: number) {
  return min + Math.random() * (max - min);
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
  if (timeSeconds < 10) {
    return {
      speed: 220,
      obstacleMin: 1.85,
      obstacleMax: 2.55,
      collectibleMin: 2.2,
      collectibleMax: 3.0,
      closedChance: 0.24,
      potholeChance: 0.08,
    };
  }
  if (timeSeconds < 20) {
    return {
      speed: 255,
      obstacleMin: 1.35,
      obstacleMax: 1.95,
      collectibleMin: 1.65,
      collectibleMax: 2.4,
      closedChance: 0.3,
      potholeChance: 0.16,
    };
  }
  if (timeSeconds < 40) {
    return {
      speed: 300,
      obstacleMin: 1.0,
      obstacleMax: 1.55,
      collectibleMin: 1.25,
      collectibleMax: 2.0,
      closedChance: 0.36,
      potholeChance: 0.22,
    };
  }
  if (timeSeconds < 60) {
    return {
      speed: 340,
      obstacleMin: 0.82,
      obstacleMax: 1.24,
      collectibleMin: 1.05,
      collectibleMax: 1.7,
      closedChance: 0.42,
      potholeChance: 0.28,
    };
  }
  return {
    speed: 380,
    obstacleMin: 0.68,
    obstacleMax: 1.06,
    collectibleMin: 0.88,
    collectibleMax: 1.48,
    closedChance: 0.48,
    potholeChance: 0.34,
  };
}

function createInitialModel(): GameModel {
  return {
    elapsed: 0,
    lives: 3,
    documents: 0,
    playerOffsetX: 0,
    playerPushTargetX: 0,
    playerY: GROUND_Y - PLAYER_DRAW_HEIGHT,
    playerVy: 0,
    onGround: true,
    invulnerability: 0,
    blockedTimer: 0,
    failZoneX: -FAIL_ZONE_WIDTH,
    worldScroll: 0,
    milestoneReached: false,
    obstacles: [],
    collectibles: [],
    nextObstacleIn: 0.75,
    nextCollectibleIn: 0.15,
    nextObstacleId: 1,
    nextCollectibleId: 1,
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

function drawBackground(ctx: CanvasRenderingContext2D, assets: LoadedAssets, scroll: number): BackgroundRenderState {
  const img = assets.background;
  const baseScale = Math.max(CANVAS_WIDTH / img.width, CANVAS_HEIGHT / img.height);
  const scale = baseScale * 1.16;
  const drawWidth = img.width * scale;
  const drawHeight = img.height * scale;
  const range = Math.max(0, drawWidth - CANVAS_WIDTH);
  const driftX = range > 0 ? scroll % range : 0;
  const yOffset = -(drawHeight - CANVAS_HEIGHT) * 0.8;
  const dx = Math.floor(-driftX) - 2;
  const dy = Math.floor(yOffset) - 2;
  const dw = Math.ceil(drawWidth) + 4;
  const dh = Math.ceil(drawHeight) + 4;
  const blendWindow = 26;

  // Keep motion one-directional; when wrapping to start, crossfade from end to start
  // to avoid a visible jump.
  if (range > 0 && driftX < blendWindow) {
    const blend = driftX / blendWindow;
    ctx.save();
    ctx.globalAlpha = 1 - blend;
    ctx.drawImage(img, Math.floor(-range) - 2, dy, dw, dh);
    ctx.restore();
    ctx.save();
    ctx.globalAlpha = blend;
    ctx.drawImage(img, dx, dy, dw, dh);
    ctx.restore();
  } else {
    ctx.drawImage(img, dx, dy, dw, dh);
  }
  return { image: img, dx, dy, scale };
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

function drawObstacle(
  ctx: CanvasRenderingContext2D,
  assets: LoadedAssets,
  obstacle: ObstacleEntity,
  bgState: BackgroundRenderState
) {
  if (obstacle.kind === "pothole") {
    const x = Math.floor(obstacle.x + 6);
    const y = Math.floor(GROUND_Y - 18);
    const w = Math.max(8, Math.floor(obstacle.w - 12));
    const h = 18;
    ctx.save();
    // Remove a small piece of the light-grey curb by replacing it with deeper ground texture.
    const sampleYOffset = 72;
    const sx = (x - bgState.dx) / bgState.scale;
    const sy = (y + sampleYOffset - bgState.dy) / bgState.scale;
    const sw = w / bgState.scale;
    const sh = h / bgState.scale;
    ctx.drawImage(bgState.image, sx, sy, sw, sh, x, y, w, h);
    ctx.restore();
    return;
  }

  const sprite = obstacle.kind === "closed-sign" ? assets.closedSign : assets.missingPhotocopy;
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
    const bgState = drawBackground(ctx, assets, model.worldScroll);
    model.collectibles.forEach((item) => drawCollectible(ctx, assets, item));
    model.obstacles.forEach((obstacle) => drawObstacle(ctx, assets, obstacle, bgState));
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

  const endGame = useCallback(() => {
    setStatus("gameover");
    setCopyState("idle");
    setShareState("idle");
    setGameOverMessage(pickRandom(GAME_OVER_MESSAGES));
    pushHud();
    stopLoop();
  }, [pushHud, stopLoop]);

  const spawnObstacle = useCallback(() => {
    const model = modelRef.current;
    const d = getDifficulty(model.elapsed);
    const roll = Math.random();
    const kind: ObstacleKind =
      roll < d.potholeChance
        ? "pothole"
        : roll < d.potholeChance + d.closedChance
          ? "closed-sign"
          : "missing-photocopy";

    const obstacle =
      kind === "closed-sign"
        ? { w: 90, h: 84, y: GROUND_Y - 84 }
        : kind === "missing-photocopy"
          ? { w: 52, h: 56, y: GROUND_Y - 56 }
          : { w: 82, h: 16, y: GROUND_Y - 8 };

    const earlySpawn = model.elapsed < 2.5;
    const spawnX = earlySpawn
      ? pickSpawnX(model, -14, 96, 180)
      : pickSpawnX(model, 16, 240, 170);

    model.obstacles.push({
      id: model.nextObstacleId,
      kind,
      x: spawnX,
      y: obstacle.y,
      w: obstacle.w,
      h: obstacle.h,
    });
    model.nextObstacleId += 1;
  }, []);

  const spawnCollectible = useCallback(() => {
    const model = modelRef.current;
    const size = 46;
    const stampHeightOffsets = [0, 42, 78];
    const y = GROUND_Y - size - pickRandom(stampHeightOffsets);
    const earlySpawn = model.elapsed < 2.5;
    const spawnX = earlySpawn
      ? pickSpawnX(model, -52, 88, 170)
      : pickSpawnX(model, 12, 280, 160);
    model.collectibles.push({
      id: model.nextCollectibleId,
      x: spawnX,
      y,
      size,
    });
    model.nextCollectibleId += 1;
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
        if (model.nextCollectibleIn < 0.55) {
          model.nextCollectibleIn = 0.55 + randomRange(0.08, 0.22);
        }
      }

      model.nextCollectibleIn -= delta;
      if (model.nextCollectibleIn <= 0 && !spawnedObstacleThisTick) {
        spawnCollectible();
        model.nextCollectibleIn = randomRange(d.collectibleMin, d.collectibleMax);
        if (model.nextObstacleIn < 0.45) {
          model.nextObstacleIn = 0.45 + randomRange(0.08, 0.2);
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
          feetRight > obstacle.x + 6 &&
          feetLeft < obstacle.x + obstacle.w - 6
      );
      if (model.playerY >= GROUND_Y - PLAYER_DRAW_HEIGHT) {
        if (overPothole) {
          model.onGround = false;
        } else {
          model.playerY = GROUND_Y - PLAYER_DRAW_HEIGHT;
          model.playerVy = 0;
          model.onGround = true;
        }
      } else {
        model.onGround = false;
      }

      if (model.playerY > FALL_DEATH_Y) {
        model.lives -= 1;
        if (model.lives <= 0) {
          endGame();
          return;
        }

        model.playerY = GROUND_Y - PLAYER_DRAW_HEIGHT;
        model.playerVy = 0;
        model.onGround = true;
        model.playerOffsetX = 0;
        model.playerPushTargetX = 0;
        model.blockedTimer = 0;
        model.invulnerability = 1.0;
        model.failZoneX = -FAIL_ZONE_WIDTH;
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

      let pushedByClosedSign = false;
      for (const obstacle of model.obstacles) {
        if (obstacle.kind === "closed-sign") {
          const signTop = obstacle.y + 2;
          const signLeft = obstacle.x + 8;
          const signRight = obstacle.x + obstacle.w - 8;
          const playerBottom = playerRect.y + playerRect.h;
          const playerCenterX = playerRect.x + playerRect.w / 2;
          const overSignTop = playerCenterX >= signLeft && playerCenterX <= signRight;
          const comingDownOntoTop = model.playerVy >= 0 && prevPlayerBottom <= signTop && playerBottom >= signTop;
          const standingOnTop = model.playerVy >= 0 && overSignTop && Math.abs(playerBottom - signTop) <= 8;

          // Closed sign is a solid object: landing on top should support the player.
          if (overSignTop && (comingDownOntoTop || standingOnTop)) {
            model.playerY = signTop - PLAYER_HITBOX.h - PLAYER_HITBOX.y;
            model.playerVy = 0;
            model.onGround = true;
            playerRect = {
              ...playerRect,
              y: model.playerY + PLAYER_HITBOX.y,
            };
            continue;
          }

          const closedBodyRect = {
            x: obstacle.x + 10,
            y: obstacle.y + 24,
            w: obstacle.w - 20,
            h: obstacle.h - 24,
          };
          if (!intersects(playerRect, closedBodyRect)) {
            continue;
          }

          pushedByClosedSign = true;
          model.blockedTimer = 0.2;

          const stuckX = obstacle.x - PLAYER_HITBOX.w - PLAYER_HITBOX.x - 6;
          const targetOffset = Math.max(-PLAYER_X + 12, stuckX - PLAYER_X);
          model.playerPushTargetX = Math.min(model.playerPushTargetX, targetOffset);
          break;
        }

        if (obstacle.kind === "pothole") continue;

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

      if (pushedByClosedSign) {
        model.playerOffsetX = easeToward(model.playerOffsetX, model.playerPushTargetX, 9.5, delta);
      } else {
        model.playerPushTargetX = 0;
        model.playerOffsetX = easeToward(model.playerOffsetX, 0, 6.8, delta);
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
        const [background, player, closedSign, missingPhotocopy, greenStamp] =
          await Promise.all([
            createImage("/immigration-dash/bg-thai-city.png"),
            createImage("/player-run.png"),
            createImage("/immigration-dash/obstacle-closed-sign.png"),
            createImage("/immigration-dash/obstacle-missing-photocopy.png"),
            createImage(GOLDEN_STAMP_SRC),
          ]);

        if (isCancelled) return;

        const playerFrames = extractPlayerFrames(player, 5);
        const playerSize = getMaxFrameSize(playerFrames);

        assetsRef.current = {
          background,
          player,
          playerFrames,
          playerMaxH: playerSize.maxH,
          closedSign: { image: closedSign, bounds: extractForegroundBounds(closedSign) },
          missingPhotocopy: { image: missingPhotocopy, bounds: extractForegroundBounds(missingPhotocopy) },
          greenStamp: { image: greenStamp, bounds: extractForegroundBounds(greenStamp) },
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
    return `I scored ${hud.score} points and survived ${seconds} seconds on Immigration Dash from Thai Visa Checklist.`;
  }, [hud.score, hud.time]);

  const canNativeShare = typeof navigator !== "undefined" && "share" in navigator;
  const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(resultText)}&url=${encodeURIComponent(GAME_URL)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(GAME_URL)}`;

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
            <p className="mt-1 text-sm text-slate-700">{resultText}</p>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <button
                type="button"
                onClick={onCopy}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-amber-300 bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-900 hover:bg-amber-200 sm:text-sm"
              >
                <Copy className="h-4 w-4" /> Copy result text
              </button>
              <button
                type="button"
                onClick={onNativeShare}
                disabled={!canNativeShare}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-violet-300 bg-violet-100 px-3 py-1.5 text-xs font-semibold text-violet-900 hover:bg-violet-200 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
              >
                <Share2 className="h-4 w-4" /> Share
              </button>
              <a
                href={xShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-black sm:text-sm"
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
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[#1664d9] bg-[#1877f2] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1664d9] sm:text-sm"
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
                {copyState === "copied" && "Result copied to clipboard."}
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
            className="block h-auto w-full touch-manipulation select-none"
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
