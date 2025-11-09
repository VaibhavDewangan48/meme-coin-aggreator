import dotenv from "dotenv";
dotenv.config();
console.log("Redis URL:", process.env.UPSTASH_REDIS_REST_URL);
console.log("Redis Token:", process.env.UPSTASH_REDIS_REST_TOKEN ? "✅ Loaded" : "❌ Missing");


import express from 'express';
import http from 'http';
import tokenRoutes from './routes/tokens';
import { initSocketServer } from './websocket/socketServer';

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.get('/', (_req, res) =>
  res.send('🚀 Meme Coin Aggregator API + WebSocket is running! Try /api/tokens?q=doge')
);

app.use('/api/tokens', tokenRoutes);

initSocketServer(server);

server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
