import http, { IncomingMessage, ServerResponse } from 'node:http';
import { Router } from './routes/router.js';
import { RideController } from './controllers/ride-controller.js';
import { EstimateRideService } from './services/estimate-service.js';
import { ConfirmationService } from './services/confirm-service.js';
import { GetRidesService } from './services/get-rides-service.js';
import { errorHandlerMiddleware } from './middlewares/error-middleware.js';
import { loggingMiddleware } from './middlewares/logger-middleware.js';
import { validatorMiddleware } from './middlewares/validator-middleware.js';
import dotenv from 'dotenv';

// Load the .env file
dotenv.config();

const PORT: number = 8080;
const HOST: string = '0.0.0.0';

// Create and configure router
const router = new Router();
const estimate_service = new EstimateRideService();
const confirmation_service = new ConfirmationService();
const get_rides_service = new GetRidesService();
const ride_controller = new RideController(estimate_service, confirmation_service, get_rides_service);

// Regitrando as rotas
router.addRoute('POST', '/ride/estimate', ride_controller.estimateRide);
router.addRoute('PATCH', '/ride/confirm', ride_controller.confirmRide);
router.addRoute('GET', '/ride/{customer_id}', ride_controller.getRides);

// Registrando os middlewares
router.addMiddleware(loggingMiddleware);
router.addMiddleware(errorHandlerMiddleware);
router.addMiddleware(validatorMiddleware);

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
  // Cors ativado para localhost desenvolvimento e testes
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Resposta ao Cors
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Rota para retornar a chave da API do Google para o front-end
  // Não utilizaria em produção
  if (req.method === 'GET' && req.url === '/api/config') {
    try {
      res.writeHead(200);
      res.end(JSON.stringify({ googleApiKey: process.env.GOOGLE_API_KEY }));
    } catch (error) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Internal server error' }));
    }
    return;
  }

  await router.handleRequest(req, res);
});

server.listen(PORT, HOST, () => {
  console.log(`Servidor esta rodando em http://${HOST}:${PORT}/`);
});
