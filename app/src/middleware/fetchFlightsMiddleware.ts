import { Response, NextFunction } from "express";
import { fetchFlightData } from "../services/flightService";
import { handleError } from "../utils/errorHandler";
import { FlightRequest } from "../types/FlightRequest";

export async function fetchFlightsMiddleware(
  req: FlightRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const flights = await fetchFlightData();
    req.flights = flights;
    next();
  } catch (error) {
    handleError(error, res);
  }
}
