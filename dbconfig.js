const mysql = require("mysql2");

// Créer un pool de connexions à la base de données
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT || 3306, // Utilisez le port spécifié dans les variables d'environnement ou le port par défaut 3306
});

// Vérifier la connexion à la base de données
pool.getConnection((error, connection) => {
  if (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1);
  } else {
    console.log("Successfully connected to the database.");
    connection.release(); // Libérer la connexion pour la remettre dans le pool
  }
});

// Gestion de la fermeture de la connexion lors de l'arrêt de l'application
process.on('SIGINT', () => {
  pool.end((err) => {
    if (err) {
      console.error("Error closing the database connection:", err.message);
    } else {
      console.log("Database connection closed.");
      process.exit();
    }
  });
});

module.exports = pool;