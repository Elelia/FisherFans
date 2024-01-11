CREATE TYPE type_status (
  ENUM('particulier', 'professionnel')
);

CREATE TYPE type_activity (
  ENUM('location', 'guide de pêche')
);

CREATE TYPE type_boat (
  ENUM('open', 'cabine', 'catamaran', 'voilier', 'jet-ski', 'canoë')
);

CREATE TYPE type_license (
  ENUM('côtier', 'fluvial')
);

CREATE TYPE type_engine (
  ENUM('diesel', 'essence', 'aucune')
);

CREATE TYPE type_trip (
  ENUM('journlière', 'récurrente')
);

CREATE TYPE type_price (
  ENUM('global', 'par personne')
);

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  last_name VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  birth DATETIME NOT NULL,
  phone_number INT NOT NULL,
  addresse VARCHAR(255) NOT NULL,
  postal_code INT NOT NULL,
  city VARCHAR(255) NOT NULL,
  langue VARCHAR(255),
  url_avatar VARCHAR(255),
  boating_license_number INT,
  insurance_number INT,
  status type_status,
  company_name VARCHAR(255),
  activity_type type_activity,
  siret INT,
  RC VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE boats (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  brand VARCHAR(255) NOT NULL,
  production_year INT NOT NULL,
  picture_url VARCHAR(255),
  required_license type_license NOT NULL,
  type type_boat,
  bail MONEY NOT NULL,
  maximum_capacity INT NOT NULL,
  bedding_number INT,
  port VARCHAR(255),
  latitude DECIMAL NOT NULL,
  longitude DECIMAL NOT NULL,
  engine_specification type_engine,
  power INT NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE boat_equipements (
  boat_id INT NOT NULL,
  equipement_id INT NOT NULL,
  PRIMARY KEY (boat_id, equipement_id),
  FOREIGN KEY (boat_id) REFERENCES boat (id),
  FOREIGN KEY (equipement_id) REFERENCES equipements (id)
);

CREATE TABLE equipements (
  equipement_id INT NOT NULL AUTO_INCREMENT,
  type_equipement VARCHAR(255) NOT NULL,
  PRIMARY KEY (equipement_id)
);

CREATE TABLE trips (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  informations VARCHAR(255) NOT NULL,
  trip_type type_trip NOT NULL,
  price_type type_price NOT NULL,
  start_date DATETIME NOT NULL,
  end_date DATETIME NOT NULL,
  start_hour DATETIME NOT NULL,
  end_hour DATETIME NOT NULL,
  passenger_number INT NOT NULL,
  price MONEY NOT NULL,
  creator_id INT NOT NULL,
  boat_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (creator_id) REFERENCES users (id),
  FOREIGN KEY (boat_id) REFERENCES boats (id)
);

CREATE TABLE reservations (
  id INT NOT NULL AUTO_INCREMENT,
  reservation_date DATETIME NOT NULL,
  seat_number INT NOT NULL,
  price INT NOT NULL,
  user_id INT NOT NULL,
  trip_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (trip_id) REFERENCES trips (id)
);

CREATE TABLE notebook (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE notebook_pages (
  id INT NOT NULL AUTO_INCREMENT,
  fish_name VARCHAR(255) NOT NULL,
  fish_url VARCHAR(255),
  comments VARCHAR(255),
  size DECIMAL,
  weight DECIMAL,
  spot VARCHAR(255),
  fishing_date DATETIME,
  release BOOLEAN,
  notebook_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (notebook_id) REFERENCES notebook (id)
);