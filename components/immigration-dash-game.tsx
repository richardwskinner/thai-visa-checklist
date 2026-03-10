"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import NextImage from "next/image";
import { Share2 } from "lucide-react";

const GAME_URL = "https://thaivisachecklist.com/games/immigration-dash";
const SHARE_URL_TEXT = "thaivisachecklist.com/games/immigration-dash";
const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 420;
const GROUND_DRAW_TOP = 338;
const GROUND_TILE_HEIGHT = 92;
const GROUND_SURFACE_Y = GROUND_DRAW_TOP + 36;
const PLAYER_X = 420;
const PLAYER_DRAW_WIDTH = 112;
const PLAYER_DRAW_HEIGHT = 112;
const PLAYER_HITBOX = { x: 31, y: 17, w: 50, h: 88 };
const FORCE_SINGLE_FRAME_PLAYER = false;
const PLAYER_SHEET_COLUMNS = 5;
const PLAYER_SHEET_ROWS = 5;
const PLAYER_ANIMATION_FPS = 8;
const FAIL_ZONE_WIDTH = 110;
const GRAVITY = 1800;
const JUMP_VELOCITY = -760;
const FALL_DEATH_Y = CANVAS_HEIGHT + 120;
const GOLDEN_STAMP_SRC = "/golden-stamp.png";
const PAPER_STACK_SRC = "/red-paper-stack.png";
const GOLDEN_STAMP_ASSET_SRC = "/golden-stamp.png?v=3";
const MISSING_PHOTOCOPY_ASSET_SRC = "/red-paper-stack.png?v=1";
const BG_SKY_SRC = "/background-sky.jpg?v=2";
const BG_CITY_SRC = "/background-city.jpg?v=2";
const GROUND_SRC = "/ground-nogaps.png?v=2";
const THAI_BLOCK_SRC = "/thai-block.png?v=2";
const PLAYER_RUN_SRC = "/Farang-runner.png?v=1";
const CLOSED_SIGN_SRC = "/obstacle-closed-sign.png?v=2";
const COLLECT_SOUND_SRC = "/collect sound.wav";
const COLLECT_SOUND_POOL_SIZE = 4;
const FAIL_ZONE_ADVANCE_SPEED_BLOCKED = 160;
const FAIL_ZONE_RETREAT_SPEED = 120;
const SKY_SCROLL_FACTOR = 0.02;
const CITY_SCROLL_FACTOR = 0.04;
const SKY_ZOOM = 1.12;
const CITY_ZOOM = 1.08;
const SKY_ANCHOR_BOTTOM = CANVAS_HEIGHT + 78;
const CITY_ANCHOR_BOTTOM = CANVAS_HEIGHT + 168;
const FIXED_TIMESTEP = 1 / 60;
const MAX_SIM_STEPS_PER_FRAME = 6;
const HUD_SYNC_INTERVAL_MS = 180;
const GOLDEN_STAMP_SIZE = 54;
const THAI_BLOCK_BONUS_STAMP_SIZE = 48;
const MISSING_PHOTOCOPY_SIZE = 52;
const THAI_BLOCK_RUN_MIN_LENGTH = 2;
const THAI_BLOCK_RUN_MAX_LENGTH = 4;
const THAI_BLOCK_RUN_MIN_ELAPSED = 7;
const STAMP_GROUND_OFFSET_Y = 4;
const REDUCE_COLLECTIBLE_EFFECTS_THRESHOLD = 8;
const CLOSED_SIGN_WIDTH = 122;
const CLOSED_SIGN_HEIGHT = 112;
const POTHOLE_COLLISION_INSET = 2;
const POTHOLE_MIN_WIDTH = 96;
const POTHOLE_MAX_WIDTH = 138;
const SCORE_FORMATTER = new Intl.NumberFormat("en-US");
const COUNTRY_OPTIONS = [
  { code: "GB", name: "UK" },
  { code: "AU", name: "Australia" },
  { code: "US", name: "USA" },
  { code: "DE", name: "Germany" },
  { code: "CA", name: "Canada" },
  { code: "FR", name: "France" },
  { code: "NL", name: "Netherlands" },
  { code: "IE", name: "Ireland" },
  { code: "NZ", name: "New Zealand" },
  { code: "ZA", name: "South Africa" },
  { code: "IN", name: "India" },
  { code: "CN", name: "China" },
  { code: "HK", name: "Hong Kong" },
  { code: "SG", name: "Singapore" },
  { code: "MY", name: "Malaysia" },
  { code: "TH", name: "Thailand" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "VN", name: "Vietnam" },
  { code: "PH", name: "Philippines" },
  { code: "ID", name: "Indonesia" },
  { code: "AE", name: "UAE" },
  { code: "CH", name: "Switzerland" },
  { code: "SE", name: "Sweden" },
  { code: "NO", name: "Norway" },
  { code: "DK", name: "Denmark" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "BR", name: "Brazil" },
  { code: "MX", name: "Mexico" },
  { code: "PL", name: "Poland" },
  { code: "AT", name: "Austria" },
  { code: "OTHER", name: "Other" },
] as const;

type GameStatus = "idle" | "running" | "paused" | "gameover";
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
  playerMaxW: number;
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

type HudState = {
  score: number;
  lives: number;
  time: number;
};

type LeaderboardEntry = {
  id: string;
  countryCode: string;
  countryName: string;
  score: number;
  createdAt: string;
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

const CLOSED_SIGN_GAME_OVER_MESSAGE = "Immigration closed for lunch.";
const GAME_OVER_MESSAGES = [
  "Missing photocopy. Please come back tomorrow.",
  "You're TM.30 is not up to date.",
  CLOSED_SIGN_GAME_OVER_MESSAGE,
  "Missed your queue. Please take a new number.",
  "Wrong form. Please apply again.",
];
const POTHOLE_GAME_OVER_MESSAGES = [
  "Watch your step. Fell into a pothole.",
  "Bangkok has eaten you up."
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

function formatScore(score: number) {
  return SCORE_FORMATTER.format(score);
}

function countryCodeToFlag(code: string) {
  if (code === "OTHER") return "🏳️";
  if (!/^[A-Z]{2}$/.test(code)) return "🏳️";
  return String.fromCodePoint(...code.split("").map((char) => 127397 + char.charCodeAt(0)));
}

function intersects(a: { x: number; y: number; w: number; h: number }, b: { x: number; y: number; w: number; h: number }) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function createImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new window.Image();
    img.decoding = "async";
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

function extractPlayerFrames(img: HTMLImageElement, columns = PLAYER_SHEET_COLUMNS, rows = PLAYER_SHEET_ROWS): FrameRect[] {
  if (FORCE_SINGLE_FRAME_PLAYER) {
    const fullFrame = extractAlphaBounds(img, undefined, 120);
    if (fullFrame) return [fullFrame];
    return [extractForegroundBounds(img)];
  }

  const cellWidth = Math.floor(img.width / columns);
  const cellHeight = Math.floor(img.height / rows);
  const frames: FrameRect[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const x = column * cellWidth;
      const y = row * cellHeight;
      const w = column === columns - 1 ? img.width - x : cellWidth;
      const h = row === rows - 1 ? img.height - y : cellHeight;
      const frame = extractAlphaBounds(img, { x, y, w, h }, 150);
      if (frame && frame.w >= 26 && frame.h >= 40) {
        frames.push(frame);
      }
    }
  }

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
  const runningIndex =
    FORCE_SINGLE_FRAME_PLAYER || frameCount <= 1 ? 0 : Math.floor(model.elapsed * PLAYER_ANIMATION_FPS) % frameCount;
  const frame = assets.playerFrames[runningIndex] ?? assets.playerFrames[0];
  const alphaBlink = model.invulnerability > 0 && Math.floor(model.elapsed * 14) % 2 === 0;
  const stableScale = Math.min(PLAYER_DRAW_WIDTH / assets.playerMaxW, PLAYER_DRAW_HEIGHT / assets.playerMaxH);
  const scale = stableScale;
  const drawW = frame.w * scale;
  const drawH = frame.h * scale;
  const dx = Math.round(
    PLAYER_X + model.playerOffsetX + (PLAYER_DRAW_WIDTH - assets.playerMaxW * scale) / 2 + ((assets.playerMaxW - frame.w) * scale) / 2
  );
  const dy = Math.round(model.playerY + (PLAYER_DRAW_HEIGHT - assets.playerMaxH * scale) + (assets.playerMaxH - frame.h) * scale);

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
  ctx.drawImage(
    sprite.image,
    source.x,
    source.y,
    source.w,
    source.h,
    Math.round(obstacle.x),
    Math.round(obstacle.y),
    Math.round(obstacle.w),
    Math.round(obstacle.h)
  );
}

function drawCollectible(
  ctx: CanvasRenderingContext2D,
  assets: LoadedAssets,
  collectible: CollectibleEntity,
  reduceEffects: boolean
) {
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
  if (!reduceEffects) {
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
  }

  ctx.drawImage(
    assets.greenStamp.image,
    source.x,
    source.y,
    source.w,
    source.h,
    Math.round(collectible.x),
    Math.round(collectible.y),
    Math.round(collectible.size),
    Math.round(collectible.size)
  );
}

function drawCanvasHud(ctx: CanvasRenderingContext2D, model: GameModel) {
  const score = Math.max(0, Math.floor(model.elapsed * 15 + model.documents * 150));
  const lives = model.lives;
  const time = Math.floor(model.elapsed);

  ctx.save();
  ctx.fillStyle = "#fde047";
  ctx.textBaseline = "top";
  ctx.textAlign = "center";
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
  const slots = [CANVAS_WIDTH / 6, CANVAS_WIDTH / 2, (CANVAS_WIDTH * 5) / 6];

  labels.forEach((text, i) => {
    const x = slots[i] ?? 30;
    const y = 14;
    ctx.fillText(text, x, y);
  });

  ctx.restore();
}

export default function ImmigrationDashGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameShellRef = useRef<HTMLDivElement | null>(null);
  const modelRef = useRef<GameModel>(createInitialModel());
  const assetsRef = useRef<LoadedAssets | null>(null);
  const ambienceAudioRef = useRef<HTMLAudioElement | null>(null);
  const collectAudioPoolRef = useRef<HTMLAudioElement[]>([]);
  const collectAudioIndexRef = useRef(0);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const accumulatorRef = useRef(0);
  const lastHudSyncRef = useRef(0);

  const [status, setStatus] = useState<GameStatus>("idle");
  const [assetsReady, setAssetsReady] = useState(false);
  const [assetError, setAssetError] = useState<string | null>(null);
  const [gameOverMessage, setGameOverMessage] = useState("");
  const [shareState, setShareState] = useState<"idle" | "shared" | "error">("idle");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fullScreenEnabled, setFullScreenEnabled] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [leaderboardStatus, setLeaderboardStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [leaderboardMessage, setLeaderboardMessage] = useState("");
  const [leaderboardSubmitState, setLeaderboardSubmitState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [leaderboardOverlayState, setLeaderboardOverlayState] = useState<"ask" | "open" | "dismissed">("ask");
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [customCountryName, setCustomCountryName] = useState("");
  const [savedLeaderboardEntryId, setSavedLeaderboardEntryId] = useState<string | null>(null);
  const [hud, setHud] = useState<HudState>({
    score: 0,
    lives: 3,
    time: 0,
  });

  const pushHud = useCallback(() => {
    const model = modelRef.current;
    const nextHud: HudState = {
      score: Math.max(0, Math.floor(model.elapsed * 15 + model.documents * 150)),
      lives: model.lives,
      time: Math.floor(model.elapsed),
    };
    setHud((prev) =>
      prev.score === nextHud.score && prev.lives === nextHud.lives && prev.time === nextHud.time ? prev : nextHud
    );
  }, []);

  const fetchLeaderboard = useCallback(async () => {
    setLeaderboardStatus("loading");
    try {
      const response = await fetch("/api/games/immigration-dash/leaderboard", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to load leaderboard.");
      }

      const data = (await response.json()) as { entries?: LeaderboardEntry[] };
      setLeaderboard(Array.isArray(data.entries) ? data.entries : []);
      setLeaderboardStatus("ready");
      setLeaderboardMessage("");
    } catch {
      setLeaderboardStatus("error");
      setLeaderboardMessage("Leaderboard unavailable right now.");
    }
  }, []);

  const playCollectSound = useCallback(() => {
    const pool = collectAudioPoolRef.current;
    if (pool.length === 0) return;
    const sound = pool[collectAudioIndexRef.current % pool.length];
    collectAudioIndexRef.current = (collectAudioIndexRef.current + 1) % pool.length;
    try {
      sound.currentTime = 0;
      const p = sound.play();
      if (p) {
        void p.catch(() => {
          // Ignore autoplay/interaction errors quietly.
        });
      }
    } catch {
      // Ignore sound failures; gameplay should continue.
    }
  }, []);

  const playAmbience = useCallback(() => {
    const ambience = ambienceAudioRef.current;
    if (!ambience) return;
    try {
      if (ambience.preload === "none") {
        ambience.preload = "auto";
        ambience.load();
      }
      ambience.muted = false;
      const p = ambience.play();
      if (p) {
        void p.catch(() => {
          // Browser may block until explicit user interaction.
        });
      }
    } catch {
      // Ignore audio failures; game remains playable.
    }
  }, []);

  const toggleFullScreen = useCallback(async () => {
    const shell = gameShellRef.current;
    if (!shell) return;

    const doc = document as Document & {
      webkitFullscreenElement?: Element | null;
      webkitExitFullscreen?: () => Promise<void> | void;
    };
    const shellWithWebkit = shell as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void> | void;
    };

    const activeElement = document.fullscreenElement ?? doc.webkitFullscreenElement ?? null;
    const inFullScreen = activeElement === shell;

    try {
      if (inFullScreen) {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        }
      } else if (shell.requestFullscreen) {
        await shell.requestFullscreen();
      } else if (shellWithWebkit.webkitRequestFullscreen) {
        await shellWithWebkit.webkitRequestFullscreen();
      }
    } catch {
      // Ignore fullscreen errors from unsupported/blocked contexts.
    }
  }, []);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const assets = assetsRef.current;
    if (!canvas || !assets) return;
    let ctx = ctxRef.current;
    if (!ctx || ctx.canvas !== canvas) {
      ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
      if (!ctx) return;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "medium";
      ctxRef.current = ctx;
    }

    const model = modelRef.current;
    const reduceCollectibleEffects = model.collectibles.length >= REDUCE_COLLECTIBLE_EFFECTS_THRESHOLD;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawParallaxLayer(ctx, assets.sky, model.worldScroll, SKY_SCROLL_FACTOR, SKY_ZOOM, SKY_ANCHOR_BOTTOM);
    drawParallaxLayer(ctx, assets.city, model.worldScroll, CITY_SCROLL_FACTOR, CITY_ZOOM, CITY_ANCHOR_BOTTOM);
    drawGroundLayer(
      ctx,
      assets,
      model.worldScroll,
      model.obstacles.filter((obstacle) => obstacle.kind === "pothole")
    );
    model.collectibles.forEach((item) => drawCollectible(ctx, assets, item, reduceCollectibleEffects));
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
    accumulatorRef.current = 0;
    lastHudSyncRef.current = 0;
  }, []);

  const endGame = useCallback((message?: string) => {
    setStatus("gameover");
    setShareState("idle");
    setGameOverMessage(message ?? pickRandom(GAME_OVER_MESSAGES));
    pushHud();
    stopLoop();
  }, [pushHud, stopLoop]);

  const spawnThaiBlockJumpStamps = useCallback((blockX: number, blockY: number, blockW: number) => {
    const model = modelRef.current;
    const baseX = blockX + blockW + randomRange(20, 36);
    const baseY = blockY - randomRange(56, 92);
    const stepX = randomRange(42, 74);
    const riseStep = randomRange(12, 30);
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

  const spawnThaiBlockRun = useCallback((startX: number, blockY: number, blockW: number) => {
    const model = modelRef.current;
    const runLength = Math.floor(randomRange(THAI_BLOCK_RUN_MIN_LENGTH, THAI_BLOCK_RUN_MAX_LENGTH + 1));
    let x = startX;

    for (let i = 0; i < runLength; i += 1) {
      model.obstacles.push({
        id: model.nextObstacleId,
        kind: "thai-block",
        x,
        y: blockY,
        w: blockW,
        h: 64,
      });
      model.nextObstacleId += 1;

      // Place a climb line of stamps over the run so the player can hop and collect.
      const stampTarget = {
        x: x + blockW * 0.5 - THAI_BLOCK_BONUS_STAMP_SIZE * 0.5 + randomRange(-6, 6),
        y: Math.max(28, blockY - 90 - i * randomRange(10, 18) + randomRange(-10, 6)),
      };
      const crowded = model.collectibles.some(
        (item) => Math.abs(item.x - stampTarget.x) < 48 && Math.abs(item.y - stampTarget.y) < 40
      );
      if (!crowded) {
        model.collectibles.push({
          id: model.nextCollectibleId,
          x: stampTarget.x,
          y: stampTarget.y,
          size: THAI_BLOCK_BONUS_STAMP_SIZE,
        });
        model.nextCollectibleId += 1;
      }

      const gap = randomRange(-6, 12);
      x += blockW + gap;
    }

    // Bonus trail after the final block to reward keeping momentum.
    if (Math.random() < 0.72) {
      spawnThaiBlockJumpStamps(x - blockW, blockY, blockW);
    }
  }, [spawnThaiBlockJumpStamps]);

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
            : {
                w: MISSING_PHOTOCOPY_SIZE,
                h: MISSING_PHOTOCOPY_SIZE,
                y: GROUND_SURFACE_Y - MISSING_PHOTOCOPY_SIZE + STAMP_GROUND_OFFSET_Y,
              };

    const earlySpawn = model.elapsed < 2.5;
    const spawnX =
      kind === "pothole"
        ? pickSpawnX(model, 240, 420, 240)
        : earlySpawn
          ? pickSpawnX(model, -14, 96, 180)
          : pickSpawnX(model, 16, 260, d.nonPotholeMinGap);

    if (
      kind === "thai-block" &&
      model.elapsed >= THAI_BLOCK_RUN_MIN_ELAPSED &&
      Math.random() < Math.min(0.42, 0.16 + model.elapsed / 220)
    ) {
      const runSpawnX = pickSpawnX(model, 26, 300, d.nonPotholeMinGap + 120);
      const blockY = GROUND_SURFACE_Y - 124;
      spawnThaiBlockRun(runSpawnX, blockY, 64);
      return;
    }

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
  }, [spawnThaiBlockJumpStamps, spawnThaiBlockRun]);

  const spawnCollectible = useCallback(() => {
    const model = modelRef.current;
    const d = getDifficulty(model.elapsed);
    const size = GOLDEN_STAMP_SIZE;
    const groundStampY = GROUND_SURFACE_Y - size + STAMP_GROUND_OFFSET_Y;
    const lanes = [0, 22, 46, 70, 94, 120, 146];
    let laneIndex = Math.floor(Math.random() * lanes.length);
    if (laneIndex === model.lastCollectibleLane && Math.random() < 0.75) {
      laneIndex = (laneIndex + 1 + Math.floor(Math.random() * (lanes.length - 1))) % lanes.length;
    }
    model.lastCollectibleLane = laneIndex;

    const laneLift = Math.max(0, lanes[laneIndex] + randomRange(-8, 10));
    const baseY = Math.max(26, groundStampY - laneLift);
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
      const y = Math.min(groundStampY, Math.max(26, baseY - i * randomRange(6, 16) + randomRange(-6, 5)));
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
        model.failZoneX = Math.min(CANVAS_WIDTH, model.failZoneX + FAIL_ZONE_ADVANCE_SPEED_BLOCKED * delta);
      } else {
        model.failZoneX = Math.max(-FAIL_ZONE_WIDTH, model.failZoneX - FAIL_ZONE_RETREAT_SPEED * delta);
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
          playCollectSound();
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
            model.blockedTimer = 0.28;

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
        endGame(CLOSED_SIGN_GAME_OVER_MESSAGE);
      }
    },
    [endGame, playCollectSound, spawnCollectible, spawnObstacle]
  );

  const startGame = useCallback(() => {
    playAmbience();
    modelRef.current = createInitialModel();
    setStatus("running");
    setShareState("idle");
    setGameOverMessage("");
    setLeaderboardSubmitState("idle");
    setLeaderboardMessage("");
    setLeaderboardOverlayState("ask");
    setSavedLeaderboardEntryId(null);
    setSelectedCountryCode("");
    setCustomCountryName("");
    setHud({
      score: 0,
      lives: 3,
      time: 0,
    });
    drawFrame();
  }, [drawFrame, playAmbience]);

  const togglePause = useCallback(() => {
    setStatus((current) => {
      if (current === "running") return "paused";
      if (current === "paused") {
        playAmbience();
        return "running";
      }
      return current;
    });
  }, [playAmbience]);

  const jump = useCallback(() => {
    playAmbience();
    if (status !== "running") return;
    const model = modelRef.current;
    if (!model.onGround) return;
    model.playerVy = JUMP_VELOCITY;
    model.onGround = false;
  }, [playAmbience, status]);

  useEffect(() => {
    const ambience = new Audio("/street-ambience-chinatown.m4a");
    ambience.loop = true;
    ambience.volume = 0.45;
    ambience.preload = "none";
    ambienceAudioRef.current = ambience;

    collectAudioPoolRef.current = Array.from({ length: COLLECT_SOUND_POOL_SIZE }, () => {
      const sound = new Audio(COLLECT_SOUND_SRC);
      sound.volume = 0.45;
      sound.preload = "auto";
      return sound;
    });

    return () => {
      if (ambienceAudioRef.current) {
        ambienceAudioRef.current.pause();
        ambienceAudioRef.current = null;
      }
      collectAudioPoolRef.current.forEach((sound) => {
        sound.pause();
      });
      collectAudioPoolRef.current = [];
      collectAudioIndexRef.current = 0;
      ctxRef.current = null;
    };
  }, []);

  useEffect(() => {
    void fetchLeaderboard();
  }, [fetchLeaderboard]);

  useEffect(() => {
    const doc = document as Document & {
      webkitFullscreenElement?: Element | null;
    };
    const shell = gameShellRef.current;
    if (!shell) return;

    const shellWithWebkit = shell as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void> | void;
    };
    setFullScreenEnabled(Boolean(shell.requestFullscreen || shellWithWebkit.webkitRequestFullscreen));

    const syncFullscreenState = () => {
      const activeElement = document.fullscreenElement ?? doc.webkitFullscreenElement ?? null;
      setIsFullScreen(activeElement === shell);
    };

    syncFullscreenState();
    document.addEventListener("fullscreenchange", syncFullscreenState);
    document.addEventListener("webkitfullscreenchange", syncFullscreenState as EventListener);
    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreenState);
      document.removeEventListener("webkitfullscreenchange", syncFullscreenState as EventListener);
    };
  }, []);

  useEffect(() => {
    const ambience = ambienceAudioRef.current;
    if (!ambience) return;

    if (status === "running") {
      const p = ambience.play();
      if (p) {
        void p.catch(() => {
          // Mobile/browser autoplay policies may block until interaction.
        });
      }
      return;
    }

    ambience.pause();
    if (status === "idle" || status === "gameover") {
      ambience.currentTime = 0;
    }
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
            createImage(PLAYER_RUN_SRC),
            createImage(CLOSED_SIGN_SRC),
            createImage(THAI_BLOCK_SRC),
            createImage(MISSING_PHOTOCOPY_ASSET_SRC),
            createImage(GOLDEN_STAMP_ASSET_SRC),
          ]);

        if (isCancelled) return;

        const playerFrames = extractPlayerFrames(player, PLAYER_SHEET_COLUMNS, PLAYER_SHEET_ROWS);
        const playerSize = getMaxFrameSize(playerFrames);
        // This asset is authored without horizontal padding; keep full width for seamless tiling.
        const groundBounds = { x: 0, y: 0, w: ground.width, h: ground.height };

        assetsRef.current = {
          sky,
          city,
          ground: { image: ground, bounds: groundBounds },
          player,
          playerFrames,
          playerMaxW: playerSize.maxW,
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
      const delta = Math.min(0.05, (ts - lastTimeRef.current) / 1000);
      lastTimeRef.current = ts;
      accumulatorRef.current += delta;

      let steps = 0;
      while (accumulatorRef.current >= FIXED_TIMESTEP && steps < MAX_SIM_STEPS_PER_FRAME) {
        updateGame(FIXED_TIMESTEP);
        accumulatorRef.current -= FIXED_TIMESTEP;
        steps += 1;
      }
      if (steps >= MAX_SIM_STEPS_PER_FRAME) {
        // Prevent long-frame catch-up spikes from causing visible hitching.
        accumulatorRef.current = 0;
      }
      drawFrame();

      if (ts - lastHudSyncRef.current > HUD_SYNC_INTERVAL_MS) {
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

  const score = hud.score;
  const shareSeconds = Math.floor(hud.time);
  const selectedCountryName =
    selectedCountryCode === "OTHER"
      ? customCountryName.trim()
      : COUNTRY_OPTIONS.find((option) => option.code === selectedCountryCode)?.name ?? "";
  const leaderboardCutoffScore = leaderboard.length >= 10 ? leaderboard[leaderboard.length - 1]?.score ?? 0 : null;
  const qualifiesForTop10 = leaderboard.length < 10 || (leaderboardCutoffScore !== null && score >= leaderboardCutoffScore);
  const resultText = useMemo(() => {
    return `🇹🇭 I survived ${shareSeconds} seconds on Immigration Dash! Score: ${score}\nCan you beat it? ${SHARE_URL_TEXT}`;
  }, [score, shareSeconds]);

  const canNativeShare = typeof navigator !== "undefined" && "share" in navigator;
  const socialShareText = useMemo(() => {
    return `🇹🇭 I survived ${shareSeconds} seconds on Immigration Dash! Score: ${score}\nCan you beat it?`;
  }, [score, shareSeconds]);
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(GAME_URL)}&quote=${encodeURIComponent(socialShareText)}`;

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

  const submitLeaderboardScore = useCallback(async () => {
    if (status !== "gameover" || score <= 0) return;
    if (!selectedCountryCode || !selectedCountryName) {
      setLeaderboardSubmitState("error");
      setLeaderboardMessage("Choose your nationality before saving your score.");
      return;
    }

    setLeaderboardSubmitState("saving");
    setLeaderboardMessage("");

    try {
      const response = await fetch("/api/games/immigration-dash/leaderboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          countryCode: selectedCountryCode,
          countryName: selectedCountryName,
          score,
        }),
      });

      const data = (await response.json()) as {
        entry?: LeaderboardEntry;
        entries?: LeaderboardEntry[];
        madeTop10?: boolean;
        error?: string;
      };

      if (!response.ok || !data.entry || !Array.isArray(data.entries)) {
        throw new Error(data.error || "Failed to save leaderboard score.");
      }

      setLeaderboard(data.entries);
      setLeaderboardStatus("ready");
      setSavedLeaderboardEntryId(data.entry.id);
      setLeaderboardSubmitState("saved");
      setLeaderboardOverlayState("open");
      setLeaderboardMessage(
        data.madeTop10
          ? `Leaderboard updated: ${countryCodeToFlag(data.entry.countryCode)} ${data.entry.countryName} - ${formatScore(data.entry.score)}`
          : "Score saved, but it did not reach the current top 10."
      );
    } catch {
      setLeaderboardSubmitState("error");
      setLeaderboardMessage("Could not save your leaderboard score.");
    }
  }, [score, selectedCountryCode, selectedCountryName, status]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-center text-xs font-semibold text-sky-700 sm:hidden">
              Mobile tip: Turn your phone sideways to play.
            </p>

            <div ref={gameShellRef} className="relative mt-2 overflow-hidden rounded-2xl border border-slate-300 bg-slate-100">
              <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                onPointerDown={jump}
                className="block h-auto w-[150%] max-w-none -translate-x-[17%] touch-manipulation select-none sm:w-[108%] sm:-translate-x-[4%] lg:w-full lg:translate-x-0"
                aria-label="Immigration Dash game"
              />

              {!assetsReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/35 px-4 text-center text-sm font-semibold text-white">
                  {assetError ? `Asset error: ${assetError}` : "Loading game assets..."}
                </div>
              )}

              {assetsReady && status !== "running" && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/25 backdrop-blur-[1px]">
                  <div
                    className={`mx-4 text-center ${
                      status === "idle"
                        ? "flex items-center justify-center"
                        : "w-full max-w-xl rounded-2xl border border-white/70 bg-white/95 p-4 shadow-lg sm:p-5"
                    }`}
                  >
                    {status !== "idle" && (
                      <h3 className="text-lg font-bold text-slate-900">{status === "paused" ? "Paused" : "Game over"}</h3>
                    )}
                    {status !== "idle" && (
                      <p className="mt-2 text-sm text-slate-600">
                        {status === "paused" ? "Game is paused. Tap Resume to continue." : gameOverMessage}
                      </p>
                    )}
                    {status === "gameover" && score > 0 && (
                      <div className="mt-3 rounded-xl border border-sky-200 bg-sky-50/80 p-3 text-left">
                        {leaderboardOverlayState === "ask" && (
                          <>
                            <p className="text-sm font-medium text-slate-800">
                              Post <span className="font-bold text-slate-900">{formatScore(score)}</span> to the leaderboard?
                            </p>
                            <div className="mt-3 flex gap-2">
                              <button
                                type="button"
                                onClick={() => setLeaderboardOverlayState("open")}
                                className="inline-flex flex-1 items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                              >
                                Yes, post it
                              </button>
                              <button
                                type="button"
                                onClick={() => setLeaderboardOverlayState("dismissed")}
                                className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                              >
                                No thanks
                              </button>
                            </div>
                          </>
                        )}

                        {leaderboardOverlayState === "open" && (
                          <>
                            <p className="text-sm font-medium text-slate-800">
                              Save your score with your nationality.
                              {qualifiesForTop10 ? " This run is currently in top-10 range." : ""}
                            </p>
                            <div className="mt-3 grid gap-2">
                              <select
                                value={selectedCountryCode}
                                onChange={(event) => {
                                  setSelectedCountryCode(event.target.value);
                                  setLeaderboardSubmitState("idle");
                                  setLeaderboardMessage("");
                                  if (event.target.value !== "OTHER") {
                                    setCustomCountryName("");
                                  }
                                }}
                                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 transition focus:border-sky-500"
                              >
                                <option value="">Choose nationality</option>
                                {COUNTRY_OPTIONS.map((option) => (
                                  <option key={option.code} value={option.code}>
                                    {countryCodeToFlag(option.code)} {option.name}
                                  </option>
                                ))}
                              </select>

                              {selectedCountryCode === "OTHER" && (
                                <input
                                  type="text"
                                  value={customCountryName}
                                  onChange={(event) => {
                                    setCustomCountryName(event.target.value);
                                    setLeaderboardSubmitState("idle");
                                    setLeaderboardMessage("");
                                  }}
                                  placeholder="Enter your nationality"
                                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 transition focus:border-sky-500"
                                />
                              )}

                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={submitLeaderboardScore}
                                  disabled={leaderboardSubmitState === "saving" || leaderboardSubmitState === "saved"}
                                  className="inline-flex flex-1 items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                  {leaderboardSubmitState === "saving"
                                    ? "Saving..."
                                    : leaderboardSubmitState === "saved"
                                      ? "Score Saved"
                                      : "Save to leaderboard"}
                                </button>
                                {leaderboardSubmitState !== "saved" && (
                                  <button
                                    type="button"
                                    onClick={() => setLeaderboardOverlayState("dismissed")}
                                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                                  >
                                    Skip
                                  </button>
                                )}
                              </div>
                            </div>
                          </>
                        )}

                        {leaderboardOverlayState === "dismissed" && leaderboardSubmitState !== "saved" && (
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm text-slate-700">Skipped leaderboard for this run.</p>
                            <button
                              type="button"
                              onClick={() => setLeaderboardOverlayState("open")}
                              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                            >
                              Post score
                            </button>
                          </div>
                        )}

                        {leaderboardMessage && leaderboardOverlayState !== "ask" && (
                          <p
                            className={`mt-2 text-xs ${
                              leaderboardSubmitState === "error" ? "text-rose-700" : "text-slate-600"
                            }`}
                          >
                            {leaderboardMessage}
                          </p>
                        )}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={status === "paused" ? togglePause : startGame}
                      className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:from-fuchsia-700 hover:to-pink-700 ${
                        status === "idle" ? "" : "mt-4"
                      }`}
                    >
                      {status === "idle" ? "Start Game" : status === "paused" ? "Resume Game" : "Restart Game"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              {(status === "running" || status === "paused") && (
                <button
                  type="button"
                  onClick={startGame}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Restart Game
                </button>
              )}
              {(status === "running" || status === "paused") && (
                <button
                  type="button"
                  onClick={togglePause}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  {status === "running" ? "Pause Game" : "Resume Game"}
                </button>
              )}
              {fullScreenEnabled && (
                <button
                  type="button"
                  onClick={toggleFullScreen}
                  className="inline-flex items-center justify-center rounded-xl border border-sky-300 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800 hover:bg-sky-100 sm:hidden"
                >
                  {isFullScreen ? "Exit Full Screen" : "Full Screen"}
                </button>
              )}
              <p className="w-full text-center text-xs text-slate-500 sm:w-auto sm:text-left sm:text-sm">
                Controls: Use space or up arrow on desktop. Tap game on mobile to jump.
              </p>
            </div>
          </div>

          <div className="grid items-start gap-3 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="space-y-3">
              <div className="rounded-2xl border border-sky-300/80 bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-2.5 shadow-[0_10px_30px_-24px_rgba(14,116,144,0.65)] sm:p-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-900">Share your result</h3>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold">
                    <span className="rounded-full border border-sky-200 bg-white px-2 py-0.5 text-sky-800">{shareSeconds}s</span>
                    <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-amber-900">Score {hud.score}</span>
                  </div>
                </div>

                <div className="mt-2 rounded-xl border border-slate-200/80 bg-white/80 px-2.5 py-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
                  <p>
                    🇹🇭 I survived <span className="font-extrabold text-slate-900">{shareSeconds}</span> seconds on Immigration Dash!{" "}
                    <span className="font-bold text-slate-900">Score: {hud.score}</span>
                  </p>
                  <p className="mt-1">
                    <span className="font-bold text-slate-900">Can you beat it?</span>{" "}
                    <span className="font-semibold text-slate-800">{SHARE_URL_TEXT}</span>
                  </p>
                </div>

                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={onNativeShare}
                    disabled={!canNativeShare}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-violet-300 bg-violet-100 px-3 py-1.5 text-xs font-semibold text-violet-900 hover:bg-violet-200 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
                  >
                    <Share2 className="h-4 w-4" /> Share
                  </button>
                  <a
                    href={facebookShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#1664d9] bg-[#1877f2] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1664d9] sm:text-sm"
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
                {shareState !== "idle" && (
                  <p className="mt-2 text-xs text-slate-500">
                    {shareState === "shared" && "Thanks for sharing."}
                    {shareState === "error" && "Sharing was cancelled or unavailable."}
                  </p>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="flex flex-col items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-3 py-3 text-center md:flex-row md:items-center md:gap-3 md:text-left">
                  <NextImage
                    src={GOLDEN_STAMP_SRC}
                    alt="Golden approved stamp"
                    width={148}
                    height={148}
                    className="h-[92px] w-[92px] shrink-0 rounded-full object-cover object-center md:h-[104px] md:w-[104px]"
                  />
                  <p className="w-full max-w-[34ch] text-sm leading-snug text-amber-900 md:max-w-none">
                    <span className="block font-semibold">Golden Approved Stamp</span>
                    <span className="mt-0.5 block">Approved! Your paperwork is perfect. Collect a stamp to increase your score.</span>
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2 rounded-xl border border-rose-300 bg-rose-50 px-3 py-3 text-center md:flex-row md:items-center md:gap-3 md:text-left">
                  <NextImage
                    src={PAPER_STACK_SRC}
                    alt="Missing photocopy paper stack"
                    width={148}
                    height={148}
                    className="h-[92px] w-[92px] shrink-0 rounded-full object-cover object-center md:h-[104px] md:w-[104px]"
                  />
                  <p className="w-full max-w-[34ch] text-sm leading-snug text-rose-900 md:max-w-none">
                    <span className="block font-semibold">Paperword Stack</span>
                    <span className="mt-0.5 block">You missed a photocopy, lose a life.</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.28)] sm:p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Top 10 leaderboard</h3>
                </div>
                {leaderboardCutoffScore !== null && (
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                    Cutoff {formatScore(leaderboardCutoffScore)}
                  </span>
                )}
              </div>

              <div className="mt-3">
                {leaderboardStatus === "loading" && leaderboard.length === 0 && (
                  <p className="text-sm text-slate-500">Loading leaderboard...</p>
                )}
                {leaderboardStatus === "error" && leaderboard.length === 0 && (
                  <p className="text-sm text-rose-700">{leaderboardMessage}</p>
                )}
                {leaderboardStatus !== "loading" && leaderboard.length === 0 && leaderboardStatus !== "error" && (
                  <p className="text-sm text-slate-500">No scores yet. Set the first benchmark.</p>
                )}

                {leaderboard.length > 0 && (
                  <ol className="space-y-2">
                    {leaderboard.map((entry, index) => {
                      const isSavedEntry = entry.id === savedLeaderboardEntryId;
                      return (
                        <li
                          key={entry.id}
                          className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm ${
                            isSavedEntry
                              ? "border-amber-300 bg-amber-50 text-amber-950"
                              : "border-slate-200 bg-slate-50 text-slate-800"
                          }`}
                        >
                          <span className="font-medium">
                            {index + 1}. {countryCodeToFlag(entry.countryCode)} {entry.countryName} - {formatScore(entry.score)}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
