import { Request } from "express";
import { Flight } from "../types/Flight";

// This is extending Request since the middleware is adding Flight[] to the req
export interface FlightRequest extends Request {
  flights?: Flight[];
}
