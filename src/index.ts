import express from 'express';
import tokenRoutes from './routes/tokens';

const app = express();
const PORT = 3000;


app.get('/', (req, res) => {
    res.send('🚀 Meme Coin Aggregator API is running! Try /api/tokens?q=doge');
  });

// Register API routes
app.use('/api/tokens', tokenRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
