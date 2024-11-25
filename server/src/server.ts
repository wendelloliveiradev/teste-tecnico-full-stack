import http, { IncomingMessage, ServerResponse } from 'node:http';
import { Router } from './routes/router.ts';
import { RideController } from './controllers/ride-controller.ts';
import { EstimateRideService } from './services/estimate-service.ts';
import { ConfirmationService } from './services/confirm-service.ts';
import { GetRidesService } from './services/get-rides-service.ts';
import { errorHandlerMiddleware } from './middlewares/error-middleware.ts';
import { loggingMiddleware } from './middlewares/logger-middleware.ts';
import { validatorMiddleware } from './middlewares/validator-middleware.ts';

const PORT: number = 3000;
const HOST: string = '127.0.0.1';

// Create and configure router
const router = new Router();
const estimate_service = new EstimateRideService();
const confirmation_service = new ConfirmationService();
const get_rides_service = new GetRidesService();
const ride_controller = new RideController(estimate_service, confirmation_service, get_rides_service);

// Register routes
router.addRoute('POST', '/ride/estimate', ride_controller.estimateRide);
router.addRoute('PATCH', '/ride/confirm', ride_controller.confirmRide);
router.addRoute('GET', '/ride/{customer_id}', ride_controller.getRides);

// Register middlewares
router.addMiddleware(loggingMiddleware);
router.addMiddleware(errorHandlerMiddleware);
router.addMiddleware(validatorMiddleware);

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
  await router.handleRequest(req, res);
});

server.listen(PORT, HOST, () => {
  console.log(`Servidor esta rodando em http://${HOST}:${PORT}/`);
});
