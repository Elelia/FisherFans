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
    await db.promise().query(`INSERT INTO notebook (user_id) VALUES ('${body.user_id}')`);
    return true;
  } catch (error) {
    throw error;
  }
}
  
module.exports = {
  getAllNotebooks,
  createNotebook
}