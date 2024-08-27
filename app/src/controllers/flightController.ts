import { Response } from "express";
import { handleError } from "../utils/errorHandler";
import { FlightRequest } from "../types/FlightRequest";
import { Flight } from "../types/Flight";

export async function getTotalFlights(req: FlightRequest, res: Response) {
  try {
    const flights: Flight[] = req.flights || [];
    res.json({ totalFlights: flights.length });
  } catch (error) {
    handleError(error, res);
  }
}

export async function getOutboundFlights(req: FlightRequest, res: Response) {
  try {
    const flights: Flight[] = req.flights || [];
    const outboundFlights = flights.filter(
      (flight) => flight.CHCINT && flight.CHCKZN
    ).length;
    res.json({ outboundFlights });
  } catch (error) {
    handleError(error, res);
  }
}

export async function getInboundFlights(req: FlightRequest, res: Response) {
  try {
    const flights: Flight[] = req.flights || [];
    const inboundFlights = flights.filter(
      (flight) => !flight.CHCINT && !flight.CHCKZN
    ).length;
    res.json({ inboundFlights });
  } catch (error) {
    handleError(error, res);
  }
}

export async function getFlightsByCountry(req: FlightRequest, res: Response) {
  try {
    const { country } = req.query;

    if (!country || typeof country !== "string") {
      return res
        .status(400)
        .json({ error: "Country parameter is required and must be a string" });
    }

    const flights: Flight[] = req.flights || [];
    const flightsByCountry = flights.filter(
      (flight) => flight.CHLOCCT.toUpperCase() === country.toUpperCase()
    );
    res.json({ flightsByCountry: flightsByCountry.length });
  } catch (error) {
    handleError(error, res);
  }
}

export async function getOutboundFlightsByCountry(
  req: FlightRequest,
  res: Response
) {
  try {
    const { country } = req.query;

    if (!country || typeof country !== "string") {
      return res
        .status(400)
        .json({ error: "Country parameter is required and must be a string" });
    }

    const flights: Flight[] = req.flights || [];
    const outboundFlightsByCountry = flights.filter(
      (flight) =>
        flight.CHCINT &&
        flight.CHCKZN &&
        flight.CHLOCCT.toUpperCase() === country.toUpperCase()
    ).length;
    res.json({ outboundFlightsByCountry });
  } catch (error) {
    handleError(error, res);
  }
}

export async function getInboundFlightsByCountry(
  req: FlightRequest,
  res: Response
) {
  try {
    const { country } = req.query;

    if (!country || typeof country !== "string") {
      return res
        .status(400)
        .json({ error: "Country parameter is required and must be a string" });
    }

    const flights: Flight[] = req.flights || [];
    const inboundFlightsByCountry = flights.filter(
      (flight) =>
        !flight.CHCINT &&
        !flight.CHCKZN &&
        flight.CHLOCCT.toUpperCase() === country.toUpperCase()
    ).length;
    res.json({ inboundFlightsByCountry });
  } catch (error) {
    handleError(error, res);
  }
}

export async function getDelayedFlights(req: FlightRequest, res: Response) {
  try {
    const flights: Flight[] = req.flights || [];
    const delayedFlights = flights.filter(
      (flight) => flight.CHRMINE === "DELAYED"
    ).length;
    res.json({ delayedFlights });
  } catch (error) {
    handleError(error, res);
  }
}

export async function getMostPopularDestination(
  req: FlightRequest,
  res: Response
) {
  try {
    const flights: Flight[] = req.flights || [];
    const outboundFlights = flights.filter(
      (flight) => flight.CHCINT && flight.CHCKZN
    );

    const cityCount = outboundFlights.reduce(
      (acc: Record<string, number>, flight) => {
        const city = flight.CHLOC1T;
        acc[city] = (acc[city] || 0) + 1;
        return acc;
      },
      {}
    );

    const mostPopularCity = Object.keys(cityCount).reduce((a, b) =>
      cityCount[a] > cityCount[b] ? a : b
    );

    res.json({ mostPopularCity });
  } catch (error) {
    handleError(error, res);
  }
}

export async function getQuickGetaway(req: FlightRequest, res: Response) {
  try {
    const flights: Flight[] = req.flights || [];
    const now = new Date();

    const outboundFlight = flights.find(
      (flight) =>
        flight.CHCINT && flight.CHCKZN && new Date(flight.CHSTOL) > now
    );

    if (!outboundFlight) {
      return res.json({}); // No suitable outbound flight found
    }

    const inboundFlight = flights.find(
      (flight) =>
        !flight.CHCINT &&
        !flight.CHCKZN &&
        new Date(flight.CHPTOL) > new Date(outboundFlight.CHSTOL)
    );

    if (inboundFlight) {
      res.json({
        departure: `${outboundFlight.CHOPER}${outboundFlight.CHFLTN}`,
        arrival: `${inboundFlight.CHOPER}${inboundFlight.CHFLTN}`,
      });
    } else {
      res.json({}); // No suitable inbound flight found
    }
  } catch (error) {
    handleError(error, res);
  }
}
