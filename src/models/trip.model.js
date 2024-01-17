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
    const query = `DELETE FROM trips WHERE id = ?`;

    const [results] = await db.promise().execute(query, [id]);

    if (results.affectedRows === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

// update one trip
async function updateTrip(body, id) {
  try {
    const query = `UPDATE trips SET title = ?, informations = ?, trip_type = ?, price_type = ?, start_date = ?, end_date = ?, start_hour = ?, end_hour = ?, passenger_number = ?, price = ?, creator_id = ?, boat_id = ? WHERE id = ?`;

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
      body.boat_id,
      id
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

// Get trip by user
async function getTripByUser(user_id) {
  try {
    const query = `SELECT * FROM trips WHERE creator_id = ?`;

    const [results] = await db.promise().execute(query, [user_id]);

    return results;
  } catch (error) {
    throw error;
  }
}

// get trip by type
async function getTripByType(type) {
  try {
    const query = `SELECT * FROM trips WHERE trip_type = ?`;

    const [results] = await db.promise().execute(query, [type]);

    return results;
  } catch (error) {
    throw error;
  }
}
  
module.exports = {
  getAllTrips,
  createTrip,
  deleteTrip,
  updateTrip,
  getTripByUser,
  getTripByType
}