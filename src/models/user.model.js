const db = require("../../dbconfig");

// Get all users
async function getAllUsers() {
  try {
    const [rows] = await db.promise().query(`SELECT * FROM users`);
    return rows;
  } catch (error) {
    throw error;
  }
}

// Insert one user
async function createUser(body) {
  try {
    const query = `INSERT INTO users (last_name, first_name, email, password, birth, phone_number, addresse, postal_code, city, langue, url_avatar, boating_license_number, insurance_number, status, company_name, activity_type, siret, RC) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    
    const [results] = await db.promise().execute(query, [
        body.last_name,
        body.first_name,
        body.email,
        body.password,
        body.birth,
        body.phone_number,
        body.addresse,
        body.postal_code,
        body.city,
        body.langue,
        body.url_avatar,
        body.boating_license_number,
        body.insurance_number,
        body.status,
        body.company_name,
        body.activity_type,
        body.siret,
        body.RC
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

// Delete one user
async function deleteUser(id) {
  try {
    const [rows] = await db.promise().query(`DELETE FROM users WHERE id = ${id}`);
    return rows.affectedRows;
  } catch (error) {
    throw error;
  }
}
  
module.exports = {
  getAllUsers,
  createUser,
  deleteUser
}