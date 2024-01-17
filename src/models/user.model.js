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
    const query = `SELECT * FROM users WHERE id = ?`;
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

// Update one user
async function updateUser(body, id) {
  try {
    const query = `UPDATE users SET last_name = ?, first_name = ?, email = ?, password = ?, birth = ?, phone_number = ?, addresse = ?, postal_code = ?, city = ?, langue = ?, url_avatar = ?, boating_license_number = ?, insurance_number = ?, status = ?, company_name = ?, activity_type = ?, siret = ?, RC = ? WHERE id = ?`;
    
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
      body.RC,
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

// get user by city
async function getUserByCity(city) {
  try {
    const query = `SELECT * FROM users WHERE city = ?`;
    const [rows] = await db.promise().execute(query, [city]);
    return rows;
  } catch (error) {
    throw error;
  }
}

// get boating license number by user
async function getBoatingLicenseNumberByUser(id) {
  try {
    const query = `SELECT boating_license_number FROM users WHERE id = ?`;
    const [rows] = await db.promise().execute(query, [id]);
    return rows;
  } catch (error) {
    throw error;
  }
}

// login
async function login(email, password) {
  try {
    const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
    const [rows] = await db.promise().execute(query, [email, password]);
    return rows;
  } catch (error) {
    throw error;
  }
}
  
module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserByCity,
  getBoatingLicenseNumberByUser,
  login
}