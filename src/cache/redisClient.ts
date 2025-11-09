const { Redis } = require("@upstash/redis");

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function getCachedData(key: string): Promise<string | null> {
  const data = await redis.get(key);
  return data as string | null;
}

async function setCachedData(
  key: string,
  value: string,
  ttl: number
): Promise<void> {
  await redis.set(key, value, { ex: ttl });
}

module.exports = { redis, getCachedData, setCachedData };
