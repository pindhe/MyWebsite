import { promises as fs } from "fs";
import path from "path";

const REDIS_KEY = encodeURIComponent("pindhe:joins");
const FILE = path.join(process.cwd(), "data", "joins.json");

type FileStore = { count: number };

function redisAuth() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ""), token };
}

async function redisCommand(pathSuffix: string): Promise<string | number | null> {
  const redis = redisAuth();
  if (!redis) return null;
  const res = await fetch(`${redis.url}/${pathSuffix}`, {
    headers: { Authorization: `Bearer ${redis.token}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { result?: string | number | null };
  return data.result ?? null;
}

async function readFileCount(): Promise<number> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const data = JSON.parse(raw) as FileStore;
    const n = Number(data.count);
    return Number.isFinite(n) && n >= 1 ? Math.floor(n) : 1;
  } catch {
    return 1;
  }
}

const memory = globalThis as { __pindheJoins?: number };

function memoryCount() {
  return memory.__pindheJoins;
}

function setMemoryCount(count: number) {
  memory.__pindheJoins = count;
}

async function writeFileCount(count: number) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify({ count }, null, 2), "utf8");
}

export async function getJoinCount(): Promise<number> {
  const redisVal = await redisCommand(`GET/${REDIS_KEY}`);
  if (redisVal != null && redisVal !== "") {
    const n = Number(redisVal);
    if (Number.isFinite(n) && n >= 0) {
      const count = Math.max(1, Math.floor(n));
      setMemoryCount(count);
      return count;
    }
  }
  const file = await readFileCount();
  const mem = memoryCount();
  const count = Math.max(file, mem ?? 0, 1);
  setMemoryCount(count);
  return count;
}

export async function incrementJoinCount(): Promise<number> {
  const redis = redisAuth();
  if (redis) {
    const existing = await redisCommand(`GET/${REDIS_KEY}`);
    if (existing == null || existing === "") {
      const seed = await getJoinCount();
      await redisCommand(`SET/${REDIS_KEY}/${seed}`);
    }
    const next = await redisCommand(`INCR/${REDIS_KEY}`);
    const n = Number(next);
    if (Number.isFinite(n) && n >= 1) {
      setMemoryCount(Math.floor(n));
      writeFileCount(n).catch(() => undefined);
      return Math.floor(n);
    }
  }

  const next = (await getJoinCount()) + 1;
  setMemoryCount(next);
  try {
    await writeFileCount(next);
  } catch {
    /* read-only hosts still keep the in-memory total */
  }
  return next;
}
