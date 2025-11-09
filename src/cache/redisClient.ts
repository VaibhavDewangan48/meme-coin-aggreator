import Redis from 'ioredis';

// Connect to local Redis instance
const redis = new Redis();

redis.on('connect', () => console.log('✅ Connected to Redis'));
redis.on('error', (err) => console.error('Redis error:', err));

export default redis;
