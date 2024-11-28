import { ConfirmRideRequestDTO, ConfirmRideResponseDTO, IConfirmationService } from "../types/definitions.js";
import { insert } from "../data/db.js";

export class ConfirmationService implements IConfirmationService {
    public async confirmRide(body: ConfirmRideRequestDTO): Promise<ConfirmRideResponseDTO> {
        const result: ConfirmRideResponseDTO = { success: true } as ConfirmRideResponseDTO;

        function getCurrentDatetime() {
            const now = new Date();
            const date = now.toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).split('/').reverse().join('-');
          
            const time = now.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            });
          
            return `${date} ${time}`;
        }

        insert("rides", {
            "customer_id": body.customer_id,
            "driver_id": body.driver.id,
            "driver_name": body.driver.name,
            "origin": body.origin,
            "destination": body.destination,
            "distance": body.distance,
            "duration": body.duration,
            "value": body.value,
            "created_at": getCurrentDatetime()
        })

        return result;
    }
}