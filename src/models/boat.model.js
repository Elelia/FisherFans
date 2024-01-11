const db = require("../../dbconfig");

// Get all trips
async function getBoatByUser(id) {
  try {
    const sql = `SELECT * FROM boats WHERE user_id = ?`;
    const [rows] = await db.promise().query(sql, [id]);
    if (rows.length) {
      return rows;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}
  
module.exports = {
  getBoatByUser
}