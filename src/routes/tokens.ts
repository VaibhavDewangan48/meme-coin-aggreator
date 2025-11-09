import express, { Request, Response } from 'express';
import { fetchFromDexScreener } from '../services/dexScreener';
const { getCachedData, setCachedData } = require('../cache/redisClient');


// import { getCachedData, setCachedData } from '../cache/redisClient';

const router = express.Router();

// Helper for sorting + pagination
const applySortAndPagination = (data: any[], sort: string, order: string, limit: number, page: number) => {
  if (sort) {
    data.sort((a, b) => {
      const x = Number(a[sort]) || 0;
      const y = Number(b[sort]) || 0;
      return order === 'desc' ? y - x : x - y;
    });
  }
  const start = (page - 1) * limit;
  const end = start + limit;
  return data.slice(start, end);
};

// GET /api/tokens
router.get('/', async (req: Request, res: Response) => {
  try {
    const query = (req.query.q as string) || 'doge';
    const sort = (req.query.sort as string) || 'volume_24h_usd';
    const order = (req.query.order as string) || 'desc';
    const limit = parseInt(req.query.limit as string) || 20;
    const page = parseInt(req.query.page as string) || 1;

    const cacheKey = `${query}_${sort}_${order}_${limit}_${page}`;
    const cached = await getCachedData(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const tokens = await fetchFromDexScreener(query);
    const result = applySortAndPagination(tokens, sort, order, limit, page);

    await setCachedData(cacheKey, JSON.stringify(result), 30); // cache for 30 s
    res.json(result);
  } catch (error) {
    console.error('Error in /api/tokens:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
