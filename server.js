const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./backend/routes/authRoutes");
const reservationRoutes = require("./backend/routes/reservationRoutes");
const restaurantRoutes = require("./backend/routes/restaurantRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", reservationRoutes, restaurantRoutes);

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
