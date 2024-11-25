import { ConfirmRideRequestDTO, EstimateRideRequestDTO, HttpError, MiddlewareType } from "../types/definitions.ts";
import { drivers } from "../utils/static-data.ts";

function validateNotBlank(value: string): boolean {
    // Retorna true se o valor não for nulo e não for uma string vazia
    return !(!value || value.trim().length === 0);
}

function isValidAddresses(origin: string, destination: string): boolean {
    // Retorna true se os endereços de origem e destino forem diferentes
    return !(origin.trim().toLowerCase() === destination.trim().toLowerCase());
}

function isValidDriver(driver_id: number, driver_name?: string): boolean {
    // Retorna true se o driver_id informado estiver presente na lista de motoristas.
    // Caso o nome do motorista seja informado, retorna true se o id e o nome do motorista forem encontrados.
    let res: boolean = false;
    if (driver_name) {
        res = drivers.some(driver => driver.id === driver_id && driver.name === driver_name);
    } else {   
        res = drivers.some(driver => driver.id === driver_id);
    }

    return res;
}

function isValidDistanceForDriver(driver_id: number, distance: number): boolean {
    // Retorna true se a distância informada for maior ou igual à distância mínima aceita pelo motorista.
    const driver = drivers.find(driver => driver.id === driver_id);
    return driver ? distance >= driver.min_km : false;
}

function validateEstimateRide(data: EstimateRideRequestDTO) {
    if (!(validateNotBlank(data.customer_id) && validateNotBlank(data.origin) && validateNotBlank(data.destination))) {
        throw new HttpError(400, "INVALID_DATA", "Os dados fornecidos no corpo da requisição são inválidos");
    }
    if (!isValidAddresses(data.origin, data.destination)) {
        throw new HttpError(400, "INVALID_DATA", "Os dados fornecidos no corpo da requisição são inválidos");
    }
}

function validateConfirmRide(data: ConfirmRideRequestDTO) {
    if (!(validateNotBlank(data.customer_id) && validateNotBlank(data.origin) && validateNotBlank(data.destination))) {
        throw new HttpError(400, "INVALID_DATA", "Os dados fornecidos no corpo da requisição são inválidos");
    }
    if (!isValidAddresses(data.origin, data.destination)) {
        throw new HttpError(400, "INVALID_DATA", "Os dados fornecidos no corpo da requisição são inválidos");
    }

    // Valida se um motorista foi informado e se ele é válido
    if (!(data.driver && isValidDriver(data.driver.id, data.driver.name))) {
        throw new HttpError(404, "DRIVER_NOT_FOUND", "Motorista não encontrado");
    }

    if (!isValidDistanceForDriver(data.driver.id, data.distance)) {
        throw new HttpError(406, "INVALID_DISTANCE", "Quilometragem inválida para o motorista");
    }
}

function validateGetRides(customer_id: string, driver_id?: number) {
    if (!(validateNotBlank(customer_id))) {
        throw new HttpError(400, "INVALID_DATA", "Os dados fornecidos no corpo da requisição são inválidos");
    }

    // Valida se o motorista informado é válido
    if (driver_id) {
        if (!isValidDriver(driver_id)) {
            throw new HttpError(400, 'INVALID_DRIVER', 'Motorista invalido');
        }
    }
}

export const validatorMiddleware: MiddlewareType = async (body, method, url, _res,  next) => {
    const path = url.pathname;
    const driver_id = url.searchParams.has('driver_id') ? +url.searchParams.get('driver_id')! : undefined;
    const customer_id = method === "GET" ? path.split('/')[2] : "0";
    const method_path = method === "GET" ? method : `${method} ${path}`;

    switch (method_path) {
        case 'POST /ride/estimate':
            validateEstimateRide(body);
            break;
        case 'PATCH /ride/confirm':
            validateConfirmRide(body);
            break;
        case 'GET':
            validateGetRides(customer_id, driver_id);
            break;
    }

    next();
}