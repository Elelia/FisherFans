const db = require("../../dbconfig");

// Get all notebooks
async function getAllNotebooks() {
  try {
    const [rows] = await db.promise().query(`SELECT * FROM notebook`);
    return rows;
  } catch (error) {
    throw error;
  }
}

// Insert one notebook
async function createNotebook(body) {
  try {
    const query = `INSERT INTO notebook (user_id) VALUES (?)`;
    
    const [results] = await db.promise().execute(query, [
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
  getAllNotebooks,
  createNotebook
}