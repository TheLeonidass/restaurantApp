const express = require("express");
const router = express.Router();
const {
  getUserReservations,
  createReservation,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservationController");
const authenticateToken = require("../middleware/authMiddleware");

router.get("/user/reservations", authenticateToken, getUserReservations);
router.post("/reservations", authenticateToken, createReservation);
router.put("/reservations/:id", authenticateToken, updateReservation);
router.delete("/reservations/:id", authenticateToken, deleteReservation);
module.exports = router;
