import { promises as fs } from "fs";
import path from "path";

const REDIS_KEY = encodeURIComponent("pindhe:joins");
const FILE = path.join(process.cwd(), "data", "joins.json");

type FileStore = { count: number };

const memory = globalThis as { __pindheJoins?: number; __pindheJoinLock?: Promise<number> };

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
    return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
  } catch {
    return 0;
  }
}

async function writeFileCount(count: number) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify({ count }, null, 2), "utf8");
}

function setMemoryCount(count: number) {
  memory.__pindheJoins = count;
}

export async function getJoinCount(): Promise<number> {
  const redisVal = await redisCommand(`GET/${REDIS_KEY}`);
  if (redisVal != null && redisVal !== "") {
    const n = Number(redisVal);
    if (Number.isFinite(n) && n >= 0) {
      const count = Math.max(0, Math.floor(n));
      setMemoryCount(count);
      return count;
    }
  }
  const file = await readFileCount();
  const mem = memory.__pindheJoins;
  const count = Math.max(file, mem ?? 0, 0);
  setMemoryCount(count);
  return count;
}

async function addJoinCountInner(amount: number): Promise<number> {
  const add = Math.min(10_000, Math.max(1, Math.floor(amount)));
  const redis = redisAuth();

  if (redis) {
    const existing = await redisCommand(`GET/${REDIS_KEY}`);
    if (existing == null || existing === "") {
      const seed = await getJoinCount();
      await redisCommand(`SET/${REDIS_KEY}/${seed}`);
    }
    const next = await redisCommand(`INCRBY/${REDIS_KEY}/${add}`);
    const n = Number(next);
    if (Number.isFinite(n) && n >= 0) {
      setMemoryCount(Math.floor(n));
      writeFileCount(n).catch(() => undefined);
      return Math.floor(n);
    }
  }

  const next = (await getJoinCount()) + add;
  setMemoryCount(next);
  try {
    await writeFileCount(next);
  } catch {
    /* read-only hosts still keep the in-memory total */
  }
  return next;
}

export function addJoinCount(amount: number): Promise<number> {
  const run = (memory.__pindheJoinLock ?? Promise.resolve(0)).then(
    () => addJoinCountInner(amount),
    () => addJoinCountInner(amount)
  );
  memory.__pindheJoinLock = run;
  return run;
}
