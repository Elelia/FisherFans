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
    const query = `INSERT INTO boats (name, description, brand, production_year, picture_url, required_license, type, bail, maximum_capacity, bedding_number, port, latitude, longitude, engine_specification, power, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const [results] = await db.promise().execute(query, [
      body.name,
      body.description,
      body.brand,
      body.production_year,
      body.picture_url,
      body.required_license,
      body.type,
      body.bail,
      body.maximum_capacity,
      body.bedding_number,
      body.port,
      body.latitude,
      body.longitude,
      body.engine_specification,
      body.power,
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

// update one boat
async function updateBoat(body, id) {
  try {
    const query = `UPDATE boats SET name = ?, description = ?, brand = ?, production_year = ?, picture_url = ?, required_license = ?, type = ?, bail = ?, maximum_capacity = ?, bedding_number = ?, port = ?, latitude = ?, longitude = ?, engine_specification = ?, power = ?, user_id = ? WHERE id = ?`;
    
    const [results] = await db.promise().execute(query, [
      body.name,
      body.description,
      body.brand,
      body.production_year,
      body.picture_url,
      body.required_license,
      body.type,
      body.bail,
      body.maximum_capacity,
      body.bedding_number,
      body.port,
      body.latitude,
      body.longitude,
      body.engine_specification,
      body.power,
      body.user_id,
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

// delete one boat
async function deleteBoat(id) {
  try {
    const query = `DELETE FROM boats WHERE id = ?`;
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

// get boat by brand
async function getBoatByBrand(brand) {
  try {
    const sql = `SELECT * FROM boats WHERE brand = ?`;
    const [rows] = await db.promise().query(sql, [brand]);
    if (rows.length) {
      return rows;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

// get boat with bounding box
async function getBoatBoundingBox(minLatitude, maxLatitude, minLongitude, maxLongitude) {
  const query = `
    SELECT * FROM boats
    WHERE latitude BETWEEN ? AND ?
    AND longitude BETWEEN ? AND ?
  `;

  try {
    const [bateaux] = await db.promise().execute(query, [minLatitude, maxLatitude, minLongitude, maxLongitude]);
    return bateaux;
  } catch (error) {
    console.error('Erreur lors de la récupération des bateaux dans la bounding box:', error);
    throw error;
  }
}
  
module.exports = {
  getAllBoats,
  getBoatByUser,
  createBoat,
  updateBoat,
  deleteBoat,
  getBoatByBrand,
  getBoatBoundingBox
}