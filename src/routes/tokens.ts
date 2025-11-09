import express from 'express';
import { fetchFromDexScreener } from '../services/dexScreener';

const router = express.Router();

// Example: /api/tokens?q=doge
router.get('/', async (req, res) => {
  const query = (req.query.q as string) || 'solana'; // Default to 'solana'
  const data = await fetchFromDexScreener(query);
  res.json(data);
});

export default router;
