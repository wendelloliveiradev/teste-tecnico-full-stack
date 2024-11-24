import { EstimateRideRequestDTO, EstimateRideResponseDTO, IEstimateService } from '../types/definitions.ts';

export class EstimateRideService implements IEstimateService{
  // Placeholder for real calculation logic, the Google Maps API would be used here
  public async getEstimate(body: EstimateRideRequestDTO): Promise<EstimateRideResponseDTO> {
    const result: EstimateRideResponseDTO = {} as EstimateRideResponseDTO;
    return result;
  }
};