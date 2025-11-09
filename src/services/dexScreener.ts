import axios from 'axios';
import redis from '../cache/redisClient';

const CACHE_TTL = 30; // cache time in seconds

export const fetchFromDexScreener = async (query: string) => {
  const cacheKey = `dexscreener:${query}`;

  try {
    // 1️⃣ Check if data exists in Redis
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log(`Cache hit for "${query}"`);
      return JSON.parse(cachedData);
    }

    // 2️⃣ If not in cache, fetch from API
    console.log(`Fetching live data for "${query}"`);
    const response = await axios.get(
      `https://api.dexscreener.com/latest/dex/search?q=${query}`
    );
    const data = response.data as any;
    const pairs = data.pairs || [];

    const tokens = pairs.map((pair: any) => ({
      token_address: pair?.baseToken?.address || 'N/A',
      token_name: pair?.baseToken?.name || 'Unknown',
      token_ticker: pair?.baseToken?.symbol || 'N/A',
      price_usd: pair?.priceUsd || 0,
      volume_24h_usd: pair?.volume?.h24 || 0,
      liquidity_usd: pair?.liquidity?.usd || 0,
      transaction_count:
        (pair?.txns?.h24?.buys || 0) + (pair?.txns?.h24?.sells || 0),
      protocol: pair?.dexId || 'N/A',
    }));

    // 3️⃣ Store in Redis for 30 seconds
    await redis.set(cacheKey, JSON.stringify(tokens), 'EX', CACHE_TTL);

    return tokens;
  } catch (error: any) {
    console.error('Error fetching from DexScreener:', error.message);
    return [];
  }
};
