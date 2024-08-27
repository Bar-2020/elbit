import { Request } from "express";
import { Flight } from "../types/Flight";

export interface FlightRequest extends Request {
  flights?: Flight[];
}
