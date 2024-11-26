import SqlBricks from "sql-bricks";
import { GetRidesResponseDTO, IGetRidesService, RideObject } from "../types/definitions.ts";
import { select } from "../data/db.ts";

export class GetRidesService implements IGetRidesService {
    public async getRides(customer_id: string, driver_id?: string): Promise<GetRidesResponseDTO> {
        let result = {} as GetRidesResponseDTO;

        if (driver_id) {
            const text = SqlBricks.select().from('rides').where({ customer_id: customer_id, driver_id: +driver_id }).toString();
            const res = select(text);
            // Extrai os dados do banco de dados e transforma em um objeto DTO
            result = this.transformToDTO(res);
        } else {
            const text = SqlBricks.select().from('rides').where({ customer_id: customer_id }).toString();
            const res = select(text);
            // Extrai os dados do banco de dados e transforma em um objeto DTO
            result = this.transformToDTO(res);
        }

        return result;
    }

    private transformToDTO(response: any[]): GetRidesResponseDTO {
        if (response.length === 0) {
          throw new Error("Response body is empty");
        }
      
        const customerId = response[0]?.customer_id || "";
        const rides: RideObject[] = response.map((ride) => ({
          id: ride.id,
          date: ride.created_at,
          origin: ride.origin,
          destination: ride.destination,
          distance: ride.distance,
          duration: ride.duration,
          driver: {
            id: ride.driver_id,
            name: ride.driver_name,
          },
          value: ride.value,
        }));

        // Inverte o array rides
        rides.reverse();
      
        return {
          customer_id: customerId,
          rides,
        };
      };
}