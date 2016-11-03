from http.server import BaseHTTPRequestHandler, HTTPServer
from ContactsDB import *
from urllib.parse import urlparse, parse_qs

class ContactsServer(BaseHTTPRequestHandler):

    def do_GET(self):
        #index or list action
        lst = ContactsDB()
        if self.path.startswith("/contacts/"):
            idPath = self.path.startswith("/contacts/")
            contact = lst.getContact(idPath)
            if contact == "":
                self.header404()
            else:
                self.header200()
                self.wfile.write(bytes(contact, "utf-8"))
        elif self.path.startswith("/contacts"):
            #handle contacts
            contacts = lst.getContacts()
            self.header200()
            print(contacts)
            self.wfile.write(bytes(contacts, "utf-8"))
        else:
            self.header404()

    def do_POST(self):
        #index or list action
        lst = ContactsDB()
        if self.path.startswith("/contacts"):
            length = self.header201()
            print("length" + str(length))
            data, amount = self.parseInput(length)
            if amount > 6:
                self.header404()
                return
            lst.addContact(data)
        else:
            self.header404()

    def do_PUT(self):
        lst = ContactsDB()
        if self.path.startswith("/contacts/"):
            length = self.header201()
            data, num = self.parseInput(length)
            lst.updateContact(self.path, data)
        else:
            self.header404()

    def do_DELETE(self):
        lst = ContactsDB()
        if self.path.startswith("/contacts/"):
            self.header204()
            lst.deleteContact(self.path)
        else:
            self.header404()

    def do_OPTIONS(self):
        # self.m200()
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With")
        self.end_headers()

    def header200(self):
        #OK
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', ' * ')
        self.send_header("Content-Type", "text/plain")
        self.end_headers()

    def header404(self):
        #error
        self.send_response(404)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header("Content-Type", "text/html")
        self.end_headers()
        self.wfile.write(bytes("<p>Couldn't read from file.</p>", "utf-8"))

    def header201(self):
        #created element
        self.send_response(201)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header("Content-Type", "text/plain")
        self.end_headers()
        length = int(self.headers['Content-Length'])
        return length

    def header204(self):
        #didn't create anything and didn't give anything back
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', ' * ')
        self.send_header("Content-Type", "text/plain")
        self.end_headers()

    def parseInput(self, length):
        data = self.rfile.read(length).decode("utf-8")
        print("parsed data: " + data)
        num = 0
        parsed = parse_qs(data)
        for key in parsed:
            num += 1
        return parsed, num

def run():
    listen = ("127.0.0.1", 8080)
    server = HTTPServer(listen, ContactsServer)
    print("Listening......")
    server.serve_forever()

run()
