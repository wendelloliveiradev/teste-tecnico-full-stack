import { RideEstimateRequest, RideEstimateResponse } from '../types/estimate-types.ts';

export const calculateRideEstimate = (body: RideEstimateRequest): RideEstimateResponse => {
  const { startLatitude, startLongitude, endLatitude, endLongitude } = body;

  // Placeholder for real calculation logic
  const distance = Math.sqrt(
    Math.pow(endLatitude - startLatitude, 2) + Math.pow(endLongitude - startLongitude, 2)
  ) * 111; // Rough conversion to kilometers

  const duration = distance / 40 * 60; // Assume average speed of 40 km/h
  const estimatedCost = distance * 2; // Assume $2 per km

  return {
    distance: Number(distance.toFixed(2)),
    duration: Number(duration.toFixed(2)),
    estimatedCost: Number(estimatedCost.toFixed(2)),
  };
};