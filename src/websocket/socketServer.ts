import { Server } from 'socket.io';
import http from 'http';
import { fetchFromDexScreener } from '../services/dexScreener';

export const initSocketServer = (server: http.Server) => {
  const io = new Server(server, {
    cors: { origin: '*' }, // allow all for testing
  });

  console.log('⚡ WebSocket server running');

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Client subscribes to a token query (e.g., "doge")
    socket.on('subscribe', async (query: string) => {
      console.log(`Client subscribed to ${query}`);
      // send immediate data
      const data = await fetchFromDexScreener(query);
      socket.emit('update', data);

      // poll every 20 seconds and push new data
      const interval = setInterval(async () => {
        const update = await fetchFromDexScreener(query);
        socket.emit('update', update);
      }, 20000);

      // stop polling when client disconnects
      socket.on('disconnect', () => {
        clearInterval(interval);
        console.log(`Client disconnected: ${socket.id}`);
      });
    });
  });

  return io;
};
