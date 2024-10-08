import { Router } from "express";
import {
  getTotalFlights,
  getOutboundFlights,
  getInboundFlights,
  getFlightsByCountry,
  getOutboundFlightsByCountry,
  getInboundFlightsByCountry,
  getDelayedFlights,
  getMostPopularDestination,
  getQuickGetaway,
} from "../controllers/flightController";
import { fetchFlightsMiddleware } from "../middleware/fetchFlightsMiddleware";

const router = Router();

// Enabling all the requests to use the fetch middleware
router.use(fetchFlightsMiddleware);

router.get("/total", getTotalFlights);
router.get("/outbound", getOutboundFlights);
router.get("/inbound", getInboundFlights);
router.get("/total/by-country", getFlightsByCountry);
router.get("/outbound/by-country", getOutboundFlightsByCountry);
router.get("/inbound/by-country", getInboundFlightsByCountry);
router.get("/delayed", getDelayedFlights);
router.get("/most-popular", getMostPopularDestination);
router.get("/quick-getaway", getQuickGetaway);

export default router;
