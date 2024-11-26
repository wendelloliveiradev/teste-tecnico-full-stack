import { IncomingMessage, ServerResponse } from "node:http";
import { ConfirmRideRequestDTO, EstimateRideRequestDTO, IConfirmationService, IEstimateService, IGetRidesService, RouteParams } from "../types/definitions.ts";

abstract class BaseController {
    protected sendSuccess(res: ServerResponse, data: any) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    }

    protected sendError(res: ServerResponse) {
        if (!res.headersSent) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error', message: "Something Went Wrong on the Server." }));
        } else {
            console.error('Headers already sent.');
        }
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
            const estimate = await this.estimate_service.getEstimate(params.body);

            this.sendSuccess(res, estimate);
      } catch (error) {
          this.sendError(res);
      }
  }

    public confirmRide = async (req: IncomingMessage, res: ServerResponse, params: RouteParams) => {
      try {
        const confirmation = await this.confirmation_service.confirmRide(params.body);

          this.sendSuccess(res, confirmation);
      } catch (error) {
          this.sendError(res);
      }
  }

    public getRides = async (req: IncomingMessage, res: ServerResponse, params: RouteParams) => {
      try {
          const { pathParams, queryParams } = params;
          const customer_id = pathParams.customer_id;
          const driver_id = queryParams.driver_id ?? undefined;

          const rides = await this.get_rides_service.getRides(customer_id, driver_id);

          this.sendSuccess(res, rides);
      } catch (error) {
          this.sendError(res);
      }
  }
}