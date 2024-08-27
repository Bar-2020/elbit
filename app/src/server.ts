import express from "express";
import flightRoutes from "./routes/flightRoutes";

const EXPRESS_PORT = 3000;
const app = express();

app.use("/flights", flightRoutes);

app.listen(EXPRESS_PORT, () => {
  console.log(`Server running on http://localhost:${EXPRESS_PORT}`);
});
