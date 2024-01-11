const db = require("../../dbconfig");

// Get all trips
async function getAllTrips() {
  try {
    const [rows] = await db.promise().query(`SELECT * FROM trips`);
    return rows;
  } catch (error) {
    throw error;
  }
}

// Insert one trip
async function createTrip(body) {
  try {
    const query = `INSERT INTO trips (title, informations, trip_type, price_type, start_date, end_date, start_hour, end_hour, passenger_number, price, creator_id, boat_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const [results] = await db.promise().execute(query, [
      body.title,
      body.informations,
      body.trip_type,
      body.price_type,
      body.start_date,
      body.end_date,
      body.start_hour,
      body.end_hour,
      body.passenger_number,
      body.price,
      body.creator_id,
      body.boat_id
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

// Delete one trip
async function deleteTrip(id) {
  try {
    const [rows] = await db.promise().query(`DELETE FROM trip WHERE id = ${id}`);
    return rows.affectedRows;
  } catch (error) {
    throw error;
  }
}
  
module.exports = {
  getAllTrips,
  createTrip,
  deleteTrip
}