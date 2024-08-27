export interface Flight {
  /** Record positive index */
  _id: number;

  /** Flight code */
  CHOPER: string;

  /** Flight number */
  CHFLTN: string;

  /** Airline company */
  CHOPERD: string;

  /** Estimated departure time */
  CHSTOL: string;

  /** Real departure time */
  CHPTOL: string;

  /** Gate */
  CHAORD: string;

  /** Short version destination airport */
  CHLOC1: string;

  /** Full name destination airport */
  CHLOC1D: string;

  /** Destination city name in Hebrew */
  CHLOC1TH: string;

  /** Destination city name in English */
  CHLOC1T: string;

  /** Destination country name in Hebrew */
  CHLOC1CH: string;

  /** Destination country name in English */
  CHLOCCT: string;

  /** TLV Terminal */
  CHTERM: string;

  /** TLV check-in counter - if empty, inbound flight; otherwise, outbound flight */
  CHCINT?: string;

  /** TLV check-in zone - if empty, inbound flight; otherwise, outbound flight */
  CHCKZN?: string;

  /** Flight status in English */
  CHRMINE: string;

  /** Flight status in Hebrew */
  CHRMINH: string;
}
