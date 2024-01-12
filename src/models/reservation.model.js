const db = require("../../dbconfig");

// Get all trips
async function getAllReservations() {
  try {
    const [rows] = await db.promise().query(`SELECT * FROM reservations`);
    return rows;
  } catch (error) {
    throw error;
  }
}

// create one reservation
async function createReservation(body) {
  try {
    const query = `INSERT INTO reservations (reservation_date, seat_number, price, user_id, trip_id) VALUES (?, ?, ?, ?, ?)`;
    
    const [results] = await db.promise().execute(query, [
      body.reservation_date,
      body.seat_number,
      body.price,
      body.user_id,
      body.trip_id
    ]);

    if (results.affectedRows === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

// delete one resrevation
async function deleteReservation(body) {
  try {
    const query = `DELETE FROM reservations WHERE id = ?`;
    
    const [results] = await db.promise().execute(query, [
      body.id
    ]);

    if (results.affectedRows === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllReservations,
  createReservation,
  deleteReservation
}