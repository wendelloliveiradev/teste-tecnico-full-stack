/* Definições de tipos para o contexto de troca de telas */
export type ScreenSwitcherProps = "estimate" | "confirm" | "get" | "loading" | "error";

export type ScreenSwitcherContextType = {
    show_screen: ScreenSwitcherProps;
    setShowScreen: (open: ScreenSwitcherProps) => void;
    estimate_request: EstimateRideFormValues;
    setEstimateRequest: (open: EstimateRideFormValues) => void;
    estimate_response: EstimateRideResponse | null;
    setEstimateResponse: (open: EstimateRideResponse | null) => void;
    get_rides_response: RideHistoryResponse | null;
    setGetRidesResponse: (open: RideHistoryResponse | null) => void;
    api_config: string;
    setApiConfig: (open: string) => void;
};
/* Fim Definições de tipos para o contexto de troca de telas */

/* Definições de tipos para a tela de estimar o valor da corrida */
export type EstimateRideFormValues = {
    customer_id: string,
    origin: string,
    destination: string,
}

export type EstimateRideOption = {
    id: number,
    name: string,
    description: string,
    vehicle: string,
    review: {
        rating: number,
        comment: string
    },
    value: number
}

export type EstimateRideResponse = {
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
    "options": EstimateRideOption[],
    "routeResponse": RouteResponse
}

type RouteResponse = {
    "routes": [
        {
            "legs": [
                {
                    "startLocation": {
                        "latLng": {
                            "latitude": number,
                            "longitude": number
                        }
                    },
                    "endLocation": {
                        "latLng": {
                            "latitude": number,
                            "longitude": number
                        }
                    }
                }
            ],
            "distanceMeters": number,
            "duration": string,
            "polyline": {
                "encodedPolyline": string
            }
        }
    ]
}

/* Fim Definições de tipos para a tela de estimar o valor da corrida */


/* Definições de tipos para a tela de confirmação de corrida */
export type AvailableRideDriver = {
    id: number,
    name: string,
    description: string,
    rating: string,
    review: string,
    pic_src: string,
    car: string,
    value: number,
}

export type ConfirmRideRequest = {
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
/* Fim Definições de tipos para a tela de confirmação de corrida */

/* Definições de tipos para a tela de histórico de corridas */
export type RideHistoryResponse = {
    "customer_id": string,
    "rides": RidesOptions[]
}

export type RidesOptions = {
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

/* Fim Definições de tipos para a tela de histórico de corridas */
