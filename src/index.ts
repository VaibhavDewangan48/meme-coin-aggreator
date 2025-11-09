import express from 'express';
import tokenRoutes from './routes/tokens';

const app = express();
const PORT = 3000;

// Register API routes
app.use('/api/tokens', tokenRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
