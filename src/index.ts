import express from 'express';
import http from 'http';
import tokenRoutes from './routes/tokens';
import { initSocketServer } from './websocket/socketServer';

const app = express();
const server = http.createServer(app);
const PORT = 3000;

// Home route
app.get('/', (req, res) => {
  res.send('Meme Coin Aggregator API + WebSocket is running! Try /api/tokens?q=doge');
});

app.use('/api/tokens', tokenRoutes);

// Initialize WebSocket
initSocketServer(server);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
