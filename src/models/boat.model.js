const db = require("../../dbconfig");

// get all boats
async function getAllBoats() {
  try {
    const [rows] = await db.promise().query(`SELECT * FROM boats`);
    return rows;
  } catch (error) {
    throw error;
  }
}

// Get boat by id user
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

// create one boat
async function createBoat(body) {
  try {
    const query = `INSERT INTO boats (name, description, price, user_id) VALUES (?, ?, ?, ?)`;
    
    const [results] = await db.promise().execute(query, [
      body.name,
      body.description,
      body.price,
      body.user_id
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
  getAllBoats,
  getBoatByUser
}