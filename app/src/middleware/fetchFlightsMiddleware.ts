import { Response, NextFunction } from "express";
import { fetchFlightData } from "../services/flightService";
import { handleError } from "../utils/errorHandler";
import { FlightRequest } from "../types/FlightRequest";

/* 
This dictionary provides the appropriate value of "q" if needed, to the middleware.
With q, the service can request the api for accurate results.
 */
const routeToQuery: Record<string, (req: FlightRequest) => string | undefined> =
  {
    "/delayed": () => "DELAYED",
    "/total/by-country": (req) => req.query.country as string | undefined,
    "/outbound/by-country": (req) => req.query.country as string | undefined,
    "/inbound/by-country": (req) => req.query.country as string | undefined,
  };

/* 
  A middleware created to provide the flight data to the controller functions in an elegant way. 
  */
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
