const db = require("../models/db");

exports.getAllRestaurants = async (req, res) => {
  try {
    const [restaurants] = await db.query("SELECT * FROM restaurants");
    res.json(restaurants);
  } catch (err) {
    console.error("Error fetching restaurants", err);
    res.status(500).json({ message: "Server error" });
  }
};
