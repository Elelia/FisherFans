const db = require('../../dbconfig');

// Get all notebooks page
async function getAllNotebookPages() {
  try {
    const [rows] = await db.promise().query(`SELECT * FROM notebook_pages`);
    return rows;
  } catch (error) {
    throw error;
  }
}

// Insert one notebook page
async function createNotebookPage(body) {
  try {
    await db.promise().query(`INSERT INTO notebook_pages (fish_name, fish_url, comments, size, weight, spot, fishing_date, release, notebook_id) VALUES ('${body.user_id}')`);
    return true;
  } catch (error) {
    throw error;
  }
}
  
module.exports = {
  getAllNotebookPages,
  createNotebookPage
}