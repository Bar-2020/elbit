import { Response } from "express";
import axios, { AxiosError } from "axios";

// Generic handleError function for controller functions. Written to avoid repetitiveness.
export function handleError(error: unknown, res: Response): void {
  const errors = error as Error | AxiosError;

  if (axios.isAxiosError(errors)) {
    res.status(errors.response?.status || 500).json({
      error: errors.response?.data || errors.message,
    });
  } else {
    res.status(500).json({ error: errors.message });
  }
}
