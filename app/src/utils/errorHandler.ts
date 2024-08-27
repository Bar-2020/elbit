import { Response } from "express";
import axios, { AxiosError } from "axios";

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
