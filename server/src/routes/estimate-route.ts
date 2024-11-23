import { IncomingMessage, ServerResponse } from 'node:http';
import { estimateRideHandler } from '../controllers/estimate-controller.ts';

export const estimateRoute = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
  if (req.method === 'POST' && req.url === '/ride/estimate') {
    await estimateRideHandler(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
};