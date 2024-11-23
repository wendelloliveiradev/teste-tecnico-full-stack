import http from 'node:http';
import { estimateRoute } from './src/routes/estimate-route.ts';

const PORT = 3000;
const HOST = '127.0.0.1';

// Create the server
const server = http.createServer(async (req, res) => {
    // Handle routes
    await estimateRoute(req, res);
});

// Start listening
server.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}/`);
});
