
#contacts

**1. id
2. name
3. phone
4. email
5. age
6. birthday
7. address**


#Database Schema
**CREATE TABLE contacts(id INTEGER PRIMARY KEY,
                      name VARCHAR(64) NOT NULL,
                      phone INTEGER,
                      email VARCHAR(64),
                      age INTEGER,
                      birthday CHAR(10),
                      address VARCHAR(64));**

#REST endpoint methods
getContacts
  do_GET
  localhost:8080/contacts and localhost:8080/contacts/{key}

addContact
  do_POST
  localhost:8080/contacts

updateContact
  do_PUT
  localhost:8080/contacts/{key}

deleteContact
  do_DELETE
  localhost:8080/contacts/{key}
