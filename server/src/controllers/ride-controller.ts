import { IncomingMessage, ServerResponse } from "node:http";
import { ConfirmRideRequestDTO, EstimateRideRequestDTO, IConfirmationService, IEstimateService, IGetRidesService, RouteParams } from "../types/definitions.ts";

abstract class BaseController {
    protected sendSuccess(res: ServerResponse, data: any, status: number = 200) {
        res.writeHead(status, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    }

    protected sendError(res: ServerResponse, error: Object, status: number = 400) {
        res.writeHead(status, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(error));
    }
}
  
 // Controllers
 export class RideController extends BaseController {
    constructor(
        private estimate_service: IEstimateService,
        private confirmation_service: IConfirmationService,
        private get_rides_service: IGetRidesService
    ) {
        super();
    }

    public estimateRide = async (req: IncomingMessage, res: ServerResponse, params: RouteParams) => {
      try {
          const { body } = params;
          const estimate = this.estimate_service.getEstimate(body as EstimateRideRequestDTO);

          this.sendSuccess(res, estimate);
      } catch (error) {
          this.sendError(res, { error: 'Invalid request' });
      }
  }

    public confirmRide = async (req: IncomingMessage, res: ServerResponse, params: RouteParams) => {
      try {
          const { body } = params;
          const confirmation = this.confirmation_service.confirmRide(body as ConfirmRideRequestDTO);

          this.sendSuccess(res, confirmation);
      } catch (error) {
          this.sendError(res, { error: 'Invalid request' });
      }
  }

    public getRides = async (req: IncomingMessage, res: ServerResponse, params: RouteParams) => {
      try {
          const { pathParams, queryParams } = params;
          const customer_id = pathParams.customer_id;
          const driver_id = queryParams.driver_id ?? undefined;

          const rides = this.get_rides_service.getRides(customer_id, driver_id);

          this.sendSuccess(res, rides);
      } catch (error) {
          this.sendError(res, { error: 'Invalid request' });
      }
  }
}