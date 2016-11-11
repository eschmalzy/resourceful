#Contacts

1. id
2. name
3. phone
4. email
5. age
6. birthday
7. address


#Database Schema
**CREATE TABLE contacts(id INTEGER PRIMARY KEY,
                      name VARCHAR(64) NOT NULL,
                      phone INTEGER,
                      email VARCHAR(64),
                      age INTEGER,
                      birthday CHAR(10),
                      address VARCHAR(64));**

#REST endpoint methods
Retrieve collection
  GET /contacts
  localhost:8080/contacts

Retrieve element
  GET /contacts/id
  localhost:8080/contacts/id

Create element
  POST /contacts
  localhost:8080/contacts

Update element
  PUT /contacts/id
  localhost:8080/contacts/id

Delete element
  DELETE /contacts/id
  localhost:8080/contacts/id
