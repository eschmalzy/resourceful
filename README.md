
contacts

id
name
phone
email
age
birthday
address


-----Database Schema------
CREATE TABLE contacts(id INTEGER PRIMARY KEY,
                      name VARCHAR(64) NOT NULL,
                      phone INTEGER,
                      email VARCHAR(64),
                      age INTEGER,
                      birthday CHAR(10),
                      address VARCHAR(64));
