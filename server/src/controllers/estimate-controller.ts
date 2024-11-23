import { IncomingMessage, ServerResponse } from 'node:http';
import { calculateRideEstimate } from '../services/estimate-service.ts';
import { RideEstimateRequest } from '../types/estimate-types.ts';

export const estimateRideHandler = (req: IncomingMessage, res: ServerResponse): void => {
  let body = '';
  req.on('data', (chunk) => (body += chunk.toString()));
  req.on('end', () => {
    try {
      const parsedBody = JSON.parse(body) as RideEstimateRequest;
      const response = calculateRideEstimate(parsedBody);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid request body' }));
    }
  });
};