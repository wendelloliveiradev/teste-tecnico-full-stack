export interface RideEstimateRequest {
  startLatitude: number;
  startLongitude: number;
  endLatitude: number;
  endLongitude: number;
}
  
export interface RideEstimateResponse {
  distance: number; // in kilometers
  duration: number; // in minutes
  estimatedCost: number; // in your currency
}