import { IncomingMessage, ServerResponse } from "node:http"

/* Estimating ride DTOs */
export interface EstimateRideRequestDTO {
    "customer_id": string,
    "origin": string,
    "destination": string
}

export interface EstimateRideResponseDTO {
    "origin": {
        "latitude": number,
        "longitude": number
    },
    "destination": {
        "latitude": number,
        "longitude": number
    },
    "distance": number,
    "duration": string,
    "options": [
        {
            "id": number,
            "name": string,
            "description": string,
            "vehicle": string,
            "review": {
                "rating": number,
                "comment": string
            },
            "value": number
        }
    ],
    "routeResponse": object
}

export interface EstiamteRideError_INVALID_DATA_DTO {
    "error_code": "INVALID_DATA",
    "error_description": string
}
/* End Estimating ride DTOs */

/* Confirming ride DTOs */
export interface ConfirmRideRequestDTO {
    "customer_id": string,
    "origin": string,
    "destination": string,
    "distance": number,
    "duration": string,
    "driver": {
        "id": number,
        "name": string
    },
    "value": number
}

export interface ConfirmRideResponseDTO {
    "success": true
}

export interface ConfirmRideError_INVALID_DATA_DTO {
    "error_code": "INVALID_DATA",
    "error_description": string
}

export interface ConfirmRideError_DRIVER_NOT_FOUND_DTO {
    "error_code": "DRIVER_NOT_FOUND",
    "error_description": string
}

export interface ConfirmRideError_INVALID_DISTANCE_DTO {
    "error_code": "INVALID_DISTANCE",
    "error_description": string
}   
/* End Confirming ride DTOs */

/* Getting rides DTOs */
export interface GetRidesResponseDTO {
    "customer_id": string,
    "rides": [
        {
            "id": number,
            "date": string,
            "origin": string,
            "destination": string,
            "distance": number,
            "duration": string,
            "driver": {
                "id": number,
                "name": string
            },
            "value": number
        }
    ]
}

export interface GetRideError_INVALID_DRIVER_DTO {
    "error_code": "INVALID_DRIVER",
    "error_description": string
}
   
export interface GetRideError_NO_RIDES_FOUND_DTO {
    "error_code": "NO_RIDES_FOUND",
    "error_description": string
}
/* End Getting rides DTOs */

/* Services Interfaces Definitions */
export interface IEstimateService{
    getEstimate(body: EstimateRideRequestDTO): Promise<EstimateRideResponseDTO>;
}

export interface IConfirmationService{
    confirmRide(body: ConfirmRideRequestDTO): Promise<ConfirmRideResponseDTO>;
}

export interface IGetRidesService{
    getRides(customer_id: string, driver_id?: string): Promise<GetRidesResponseDTO>;
}

/* End Services Interfaces Definitions */

/* Router types definition */
export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
export type RouteHandler = (req: IncomingMessage, res: ServerResponse, params: RouteParams) => void | Promise<void>;

export interface RouteParams {
    queryParams: Record<string, string>;
    pathParams: Record<string, string>;
    body?: any;
}

export interface Route {
    method: HttpMethod;
    path: string;
    handler: RouteHandler;
}
/* End Router types definition */