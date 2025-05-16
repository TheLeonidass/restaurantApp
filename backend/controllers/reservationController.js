const db = require("../models/db");

exports.getUserReservations = async (req, res) => {
  const userId = req.user.user_id;

  try {
    const [results] = await db.query(
      `SELECT r.reservation_id, r.date, r.time, r.people_count, rs.name AS restaurant_name
         FROM reservations r
         JOIN restaurants rs ON r.restaurant_id = rs.restaurant_id
         WHERE r.user_id = ?`,
      [userId]
    );

    res.json(results);
  } catch (err) {
    console.error("Error fetching reservations:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createReservation = async (req, res) => {
  const userId = req.user.user_id;
  const { restaurant_id, date, time, people_count } = req.body;

  if (!restaurant_id || !date || !time || !people_count) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO reservations (user_id, restaurant_id, date, time, people_count)
         VALUES (?, ?, ?, ?, ?)`,
      [userId, restaurant_id, date, time, people_count]
    );

    res.status(201).json({
      message: "Reservation Successful",
      reservation_id: result.insertId,
    });
  } catch (err) {
    console.error("Error creating reservation:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateReservation = async (req, res) => {
  const userId = req.user.user_id;
  const reservationId = req.params.id;
  const { date, time, people_count } = req.body;

  if (!date || !time || !people_count) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM reservations WHERE reservation_id = ? AND user_id = ?",
      [reservationId, userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    await db.query(
      `UPDATE reservations
       SET date = ?, time = ?, people_count = ?
       WHERE reservation_id = ? AND user_id = ?`,
      [date, time, people_count, reservationId, userId]
    );
    res.json({ message: "Reservation updated successfully" });
  } catch (err) {
    console.error("Error updating reservation:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteReservation = async (req, res) => {
  const userId = req.user.user_id;
  const reservationId = req.params.id;

  try {
    const [rows] = await db.query(
      "SELECT * FROM reservations WHERE reservation_id = ? AND user_id = ?",
      [reservationId, userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    await db.query(
      "DELETE FROM reservations WHERE reservation_id = ? AND user_id = ?",
      [reservationId, userId]
    );
    res.json({ message: "Reservation deleted successfully" });
  } catch (err) {
    console.error("Error deleting reservation:", err);
    res.status(500).json({ message: "Server error" });
  }
};
