import axios from "axios";
import { Flight } from "../types/Flight";

const FLIGHTS_API_URL = "https://data.gov.il/api/3/action/datastore_search";
const RESOURCE_ID = "e83f763b-b7d7-479e-b172-ae981ddc6de5";
const QUERY_LIMIT = 300;

export async function fetchFlightData(q?: string): Promise<Flight[]> {
  try {
    const response = await axios.get(FLIGHTS_API_URL, {
      params: {
        resource_id: RESOURCE_ID,
        limit: QUERY_LIMIT,
        q: q,
      },
    });
    return response.data.result.records;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch flight data.");
  }
}
