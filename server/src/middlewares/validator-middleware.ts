import { ServerResponse } from "http";
import { ConfirmRideRequestDTO, EstimateRideRequestDTO } from "../types/definitions.ts";
import { drivers } from "../utils/static-data.ts";

function validateNotBlank(value: string): boolean {
    if (!value || value.trim().length === 0) {
        return false;
    }
    return true;
}

function validateAddresses(origin: string, destination: string): boolean {
    if (origin.trim().toLowerCase() === destination.trim().toLowerCase()) {
        // Add error to result
        return false;
    }
    return true;
}

function isValidDriver(driverId: number): boolean {
    return drivers.some(driver => driver.id === driverId);
}

function isValidDistanceForDriver(driverId: number, distance: number): boolean {
    const driver = drivers.find(driver => driver.id === driverId);
    return driver ? distance >= driver.min_km : false;
}

function validateEstimateRide(data: EstimateRideRequestDTO) {
    validateNotBlank(data.customer_id);
    validateNotBlank(data.origin);
    validateNotBlank(data.destination);
    validateAddresses(data.origin, data.destination);
    
    return 'result';
}

function validateConfirmRide(data: ConfirmRideRequestDTO) {
    validateNotBlank(data.customer_id);
    validateNotBlank(data.origin);
    validateNotBlank(data.destination);
    validateAddresses(data.origin, data.destination);

    // Valida se um motorista foi informado e se ele é válido
    if (!(data.driver && isValidDriver(data.driver.id))) {
        return 'Driver information is required';
    }

    if (!isValidDistanceForDriver(data.driver.id, data.distance)) {
        return 'Invalid distance for this driver';
    }
}

function validateGetRides(customer_id: string, driver_id?: number) {
    validateNotBlank(customer_id);
    if (driver_id && !isValidDriver(driver_id)) {
        return 'Invalid driver';
    }
}

function validatorMiddleware(res: ServerResponse, path: string, body: any,  next: () => void) {
    let error: string | undefined;
    const {customer_id, driver_id} = body;

    switch (path) {
        case '/ride/estimate':
            error = validateEstimateRide(body);
            break;
        case '/ride/confirm':
            error = validateConfirmRide(body);
            break;
        case '/ride/{customer_id}':
            error = validateGetRides(customer_id, driver_id);
            break;
    }

    if (error) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error }));
    } else {
        next();
    }
}