import { Response } from "express";
import { handleError } from "../utils/errorHandler";
import { FlightRequest } from "../types/FlightRequest";
import { Flight } from "../types/Flight";

export async function getTotalFlights(req: FlightRequest, res: Response) {
  try {
    const flights = req.flights || [];
    res.json({ totalFlights: flights.length });
  } catch (error) {
    handleError(error, res);
  }
}

export async function getOutboundFlights(req: FlightRequest, res: Response) {
  try {
    const flights = req.flights || [];
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
    const flights = req.flights || [];
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

    const flights = req.flights || [];
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

    const flights = req.flights || [];
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

    const flights = req.flights || [];
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
    const flights = req.flights || [];
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
    const flights = req.flights || [];
    const outboundFlights = flights.filter(
      (flight) => flight.CHCINT && flight.CHCKZN
    );

    // Creating a dictionary to accumulate number of outbound flights per city
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
    const flights = req.flights || [];
    const now = new Date();

    // Group flights by city
    const flightsByCity = flights.reduce(
      (acc, flight) => {
        const city = flight.CHLOC1T;
        if (!acc[city]) {
          acc[city] = [];
        }
        acc[city].push(flight);
        return acc;
      },
      {} as Record<string, Flight[]>
    );

    // Try to find suitable outbound and inbound flights and return when one has been found
    for (const city in flightsByCity) {
      const cityFlights = flightsByCity[city];

      const outboundFlight = cityFlights.find(
        (flight) =>
          flight.CHCINT && flight.CHCKZN && new Date(flight.CHSTOL) > now
      );

      if (outboundFlight) {
        const inboundFlight = cityFlights.find(
          (flight) =>
            !flight.CHCINT &&
            !flight.CHCKZN &&
            new Date(flight.CHPTOL) > new Date(outboundFlight.CHPTOL) // Ensure inbound flight departure is after outbound departure
        );

        if (inboundFlight) {
          /* 
          Both flights have been found and a response to the client can be returned. 
          I decided to add a timestamp to avoid confusion with repeating flights
          */
          return res.json({
            departure: `${outboundFlight.CHOPER}${outboundFlight.CHFLTN} @${outboundFlight.CHPTOL}`,
            arrival: `${inboundFlight.CHOPER}${inboundFlight.CHFLTN} @${inboundFlight.CHPTOL}`,
          });
        }
      }
    }

    // No suitable outbound and inbound flights found, responding with not found.
    res.status(404).json({});
  } catch (error) {
    handleError(error, res);
  }
}
