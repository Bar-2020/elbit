import { Request, Response } from "express";
import { fetchFlightData } from "../services/flightService";
import { handleError } from "../utils/errorHandler";
import { Flight } from "../types/Flight";

export async function getTotalFlights(req: Request, res: Response) {
  try {
    const flights: Flight[] = await fetchFlightData();
    res.json({ totalFlights: flights.length });
  } catch (error) {
    handleError(error, res);
  }
}

export async function getOutboundFlights(req: Request, res: Response) {
  try {
    const flights: Flight[] = await fetchFlightData();
    const outboundFlights = flights.filter(
      (flight) => flight.CHCINT && flight.CHCKZN
    ).length;
    res.json({ outboundFlights });
  } catch (error) {
    handleError(error, res);
  }
}

export async function getInboundFlights(req: Request, res: Response) {
  try {
    const flights: Flight[] = await fetchFlightData();
    const inboundFlights = flights.filter(
      (flight) => !flight.CHCINT && !flight.CHCKZN
    ).length;
    res.json({ inboundFlights });
  } catch (error) {
    handleError(error, res);
  }
}

export async function getFlightsByCountry(req: Request, res: Response) {
  try {
    const { country } = req.query;

    if (!country || typeof country !== "string") {
      return res
        .status(400)
        .json({ error: "Country parameter is required and must be a string" });
    }

    console.log(country);
    const flights: Flight[] = await fetchFlightData();

    const flightsByCountry = flights.filter(
      (flight) => flight.CHLOCCT.toUpperCase() === country.toUpperCase()
    );
    res.json({ flightsByCountry: flightsByCountry.length });
  } catch (error) {
    handleError(error, res);
  }
}

export async function getOutboundFlightsByCountry(req: Request, res: Response) {
  try {
    const { country } = req.query;

    if (!country || typeof country !== "string") {
      return res
        .status(400)
        .json({ error: "Country parameter is required and must be a string" });
    }

    const flights: Flight[] = await fetchFlightData();
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

export async function getInboundFlightsByCountry(req: Request, res: Response) {
  try {
    const { country } = req.query;

    if (!country || typeof country !== "string") {
      return res
        .status(400)
        .json({ error: "Country parameter is required and must be a string" });
    }

    const flights: Flight[] = await fetchFlightData();
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

export async function getDelayedFlights(req: Request, res: Response) {
  try {
    const flights: Flight[] = await fetchFlightData();
    const delayedFlights = flights.filter(
      (flight) => flight.CHRMINE === "DELAYED"
    ).length;
    res.json({ delayedFlights });
  } catch (error) {
    handleError(error, res);
  }
}

export async function getMostPopularDestination(req: Request, res: Response) {
  try {
    const flights: Flight[] = await fetchFlightData();
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

export async function getQuickGetaway(req: Request, res: Response) {
  try {
    const flights: Flight[] = await fetchFlightData();

    // Get the current date and time
    const now = new Date();

    // Find the first outbound flight that is departing after the current time
    const outboundFlight = flights.find(
      function (flight) {
        return flight.CHCINT && flight.CHCKZN && new Date(flight.CHSTOL) > now;
      } // Compare the parsed date with the current date
    );

    if (!outboundFlight) {
      return res.json({}); // No suitable outbound flight found
    }

    // Find the first inbound flight that arrives after the outbound flight departs
    const inboundFlight = flights.find(
      (flight) =>
        !flight.CHCINT &&
        !flight.CHCKZN &&
        new Date(flight.CHPTOL) > new Date(outboundFlight.CHSTOL)
    );

    if (inboundFlight) {
      console.log(outboundFlight.CHSTOL, inboundFlight.CHSTOL);
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
