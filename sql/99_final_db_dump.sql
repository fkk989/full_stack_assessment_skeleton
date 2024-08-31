USE home_db;

-- dropping exiting table
DROP TABLE IF EXISTS home;

DROP TABLE IF EXISTS user;

-- Rename user_home to old_user_home
RENAME TABLE user_home TO old_user_home;

-- Creatting new user table
CREATE TABLE user (
    username VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL
);

-- Creatting new home table
CREATE TABLE home (
    street_address VARCHAR(255) PRIMARY KEY,
    state VARCHAR(255) NOT NULL,
    zip VARCHAR(10) NOT NULL,
    sqft INT NOT NULL,
    beds INT NOT NULL,
    baths INT NOT NULL,
    list_price INT NOT NULL
);

-- Creating new user_home talbe
CREATE TABLE user_home (
    username VARCHAR(255),
    street_address VARCHAR(255),
    PRIMARY KEY (username, street_address),
    FOREIGN KEY (username) REFERENCES user(username) ON DELETE CASCADE,
    FOREIGN KEY (street_address) REFERENCES home(street_address) ON DELETE CASCADE
);

-- slecting username and email from old_user_home table and inserting into user
INSERT INTO
    user (username, email)
SELECT
    DISTINCT username,
    email
FROM
    old_user_home;

-- slecting home details from old_user_home table and inserting into home
INSERT INTO
    home (
        street_address,
        state,
        zip,
        sqft,
        beds,
        baths,
        list_price
    )
SELECT
    DISTINCT street_address,
    state,
    zip,
    sqft,
    beds,
    baths,
    list_price
FROM
    old_user_home;

-- creating relation ship table between user and home 
INSERT INTO
    user_home (username, street_address)
SELECT
    username,
    street_address
FROM
    old_user_home;

-- droping the old table as its not needed now 
DROP TABLE IF EXISTS old_user_home;