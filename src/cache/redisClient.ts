// import Redis from 'ioredis';

// // Connect to local Redis instance
// const redis = new Redis();

// redis.on('connect', () => console.log('✅ Connected to Redis'));
// redis.on('error', (err) => console.error('Redis error:', err));

// export default redis;

import Redis from 'ioredis';

const redis = new Redis();

export const getCachedData = async (key: string) => redis.get(key);
export const setCachedData = async (key: string, value: string, ttl: number) => redis.set(key, value, 'EX', ttl);

export default redis;
