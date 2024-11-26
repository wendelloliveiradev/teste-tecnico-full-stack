import { ConfirmRideRequestDTO, ConfirmRideResponseDTO, IConfirmationService } from "../types/definitions.ts";
import { insert } from "../data/db.ts";

export class ConfirmationService implements IConfirmationService {
    public async confirmRide(body: ConfirmRideRequestDTO): Promise<ConfirmRideResponseDTO> {
        const result: ConfirmRideResponseDTO = { success: true } as ConfirmRideResponseDTO;

        insert("rides", {
            "customer_id": body.customer_id,
            "driver_id": body.driver.id.toString(),
            "driver_name": body.driver.name,
            "origin": body.origin,
            "destination": body.destination,
            "distance": body.distance.toString(),
            "duration": body.duration,
            "value": body.value.toString(),
            "created_at": new Date().toLocaleString('en-CA', { hour12: false }).replace(',', '')
        })

        return result;
    }
}