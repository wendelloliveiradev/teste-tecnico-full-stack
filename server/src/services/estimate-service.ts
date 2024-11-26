import axios from 'axios';
import { DriverOptionObject, EstimateRideRequestDTO, EstimateRideResponseDTO, GoogleApiRoutesResponse, IEstimateService } from '../types/definitions.ts';
import { Driver, drivers } from '../data/static-data.ts';

export class EstimateRideService implements IEstimateService{
  private url = "https://routes.googleapis.com/directions/v2:computeRoutes";


  public async getEstimate(body: EstimateRideRequestDTO): Promise<EstimateRideResponseDTO> {
    const origin = body.origin;
    const destination = body.destination;
    const resquest_body = {
      "origin": { "address": origin },
      "destination": { "address": destination },
      "travelMode": "DRIVE"
    }


    try {
      const response = await axios.post(this.url, resquest_body, {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": "AIzaSyBYe63aWhH7npwZVXqi-py3jSaLwC01Vss",
          "X-Goog-FieldMask":
            "routes.legs.start_location,routes.legs.end_location,routes.distanceMeters,routes.duration,routes.polyline",
        },
      });

      // Converte a resposta para o DTO de resposta
      const estimateRideResponse: EstimateRideResponseDTO = this.transformResponse(response.data);

      return estimateRideResponse;
    } catch (error) {
      console.error("Error fetching directions:", error);
      throw new Error("Failed to fetch directions.");
    }
  }
  
  private transformResponse(response: GoogleApiRoutesResponse): EstimateRideResponseDTO {
    return {
      origin: {
        latitude: response.routes[0].legs[0].startLocation.latLng.latitude,
        longitude: response.routes[0].legs[0].startLocation.latLng.longitude,
      },
      destination: {
        latitude: response.routes[0].legs[0].endLocation.latLng.latitude,
        longitude: response.routes[0].legs[0].endLocation.latLng.longitude,
      },
      distance: response.routes[0].distanceMeters,
      duration: response.routes[0].duration,
      options: this.getDriversOptions(response.routes[0].distanceMeters),
      routeResponse: response
    };
  }

  private getDriversOptions(distance: number): DriverOptionObject[] {
    // Implementa a lógica para retornar os motoristas disponíveis
    const available_drivers: Driver[] = drivers.filter(driver => driver.min_km <= distance);
    let return_drivers: DriverOptionObject[] = [];
    
    return_drivers = available_drivers.map(driver => {
      const rev = driver.review;
      const i_space = rev.indexOf(" ");
      const driver_option: DriverOptionObject = {
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.car,
        review: {
          rating: +rev.slice(0, i_space),
          comment: rev.slice(i_space+1, rev.length),
        },
        value: parseFloat(driver.rate.replace("R$ ", "").replace("/km", "")) * (distance/1000),
      };

      return driver_option;
    });
  
    return return_drivers;
  }
};