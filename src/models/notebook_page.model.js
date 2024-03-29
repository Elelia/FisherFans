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
    const query = `INSERT INTO notebook_pages (fish_name, fish_url, comments, size, weight, spot, fishing_date, release_fish, notebook_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const [results] = await db.promise().execute(query, [
      body.fish_name,
      body.fish_url,
      body.comments,
      body.size,
      body.weight,
      body.spot,
      body.fishing_date,
      body.release_fish,
      body.notebook_id
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

// Update one notebook page
async function updateNotebookPage(body, id) {
  try {
    const query = `UPDATE notebook_pages SET fish_name = ?, fish_url = ?, comments = ?, size = ?, weight = ?, spot = ?, fishing_date = ?, release_fish = ? 
    WHERE id = ?`;
    
    const [results] = await db.promise().execute(query, [
      body.fish_name,
      body.fish_url,
      body.comments,
      body.size,
      body.weight,
      body.spot,
      body.fishing_date,
      body.release_fish,
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

// Delete one notebook page
async function deleteNotebookPage(id) {
  try {
    const query = `DELETE FROM notebook_pages WHERE id = ?`;
    
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

// get notebook page by user
async function getNotebookPageByUser(id) {
  try {
    const query = `SELECT * FROM notebook_pages np INNER JOIN notebook n on np.notebook_id = n.id WHERE n.user_id = ?`;
    
    const [rows] = await db.promise().execute(query, [id]);

    if (rows.length > 0) {
      return rows;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}
  
module.exports = {
  getAllNotebookPages,
  createNotebookPage,
  updateNotebookPage,
  deleteNotebookPage,
  getNotebookPageByUser
}