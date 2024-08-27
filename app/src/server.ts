import express from "express";
import flightRoutes from "./routes/flightRoutes";

const app = express();
const port = 3000;

app.use("/flights", flightRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
