// import Redis from 'ioredis';

// // Connect to local Redis instance
// const redis = new Redis();

// redis.on('connect', () => console.log('✅ Connected to Redis'));
// redis.on('error', (err) => console.error('Redis error:', err));

// export default redis;

// import Redis from 'ioredis';

// const redis = new Redis();

// export const getCachedData = async (key: string) => redis.get(key);
// export const setCachedData = async (key: string, value: string, ttl: number) => redis.set(key, value, 'EX', ttl);

// export default redis;


import Redis from 'ioredis';
// Works with Upstash URL or local Redis
const redis = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : new Redis();

redis.on('connect', () => console.log('✅ Connected to Redis'));
redis.on('error', (e) => console.error('❌ Redis error:', e));

export const getCachedData = async (k: string) => redis.get(k);
export const setCachedData = async (k: string, v: string, ttl: number) => redis.set(k, v, 'EX', ttl);
export default redis;
