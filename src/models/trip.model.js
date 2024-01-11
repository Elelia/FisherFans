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