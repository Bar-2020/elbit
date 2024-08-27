import { Response, NextFunction } from "express";
import { fetchFlightData } from "../services/flightService";
import { handleError } from "../utils/errorHandler";
import { FlightRequest } from "../types/FlightRequest";

const routeToQuery: Record<string, (req: FlightRequest) => string | undefined> =
  {
    "/delayed": () => "DELAYED",
    "/total/by-country": (req) => req.query.country as string | undefined,
    "/outbound/by-country": (req) => req.query.country as string | undefined,
    "/inbound/by-country": (req) => req.query.country as string | undefined,
  };

export async function fetchFlightsMiddleware(
  req: FlightRequest,
  res: Response,
  next: NextFunction
) {
  try {
    // Determine the query parameter based on the current route
    const getQueryParam = routeToQuery[req.path];
    const q = getQueryParam ? getQueryParam(req) : undefined;

    const flights = await fetchFlightData(q);
    req.flights = flights;
    next();
  } catch (error) {
    handleError(error, res);
  }
}
