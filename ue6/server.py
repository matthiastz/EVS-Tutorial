#!/usr/bin/python3
# -*- coding: utf-8 -*-

import socket

TCP_IP = ''
TCP_PORT = 5000

def create_error_page(conn, err_string):
    response = ("HTTP/1.1 200 OK\r\n"
                "Connection: close\r\n"
                "Content-Type: text/html\r\n\r\n"
                "<html><head><title>ERROR</title></head>\r\n"
                "<body><h1>Error</h1><hr/><p>{}</p></body></html>"
                .format(err_string))
    conn.send(response.encode())
    conn.close()

def handleRequest(conn):
    data = conn.recv(1024).decode() # buffer length 1024

    head, body = data.split("\r\n\r\n")
    header = {}
    values = {}

    lines = head.split("\r\n")
    # save all the different header parts of the request (host, user-agent, language…)
    for line in lines[1:]:
        key, value = line.split(': ')
        header[key] = value

    # get cookie information
    cookie_list = {}
    if 'Cookie' in header:
        temp_cookies = header['Cookie'].split("; ") # cookie name/value pairs
        for item in temp_cookies:
            key, value = item.split("=")
            cookie_list[key] = value

    if 'kontostand' in cookie_list:
        kontostand = float(cookie_list['kontostand']) # get the value of the 'kontostand' entry
    else:
        kontostand = 100 # default

    # content of the body part of the html page -> get amount later
    if body:
        pairs = body.split('&')
        for pair in pairs:
            key, value = pair.split('=')
            values[key] = value

    # get the value of the amount that was sent
    if 'amount' in values: # old style: has key
        try:
            amount = float(values['amount'])
        except:
            create_error_page(conn, "{} ist kein Fliesskommawert".format(values['amount']))
            return

        kontostand -= amount

    # http request
    http_req_method = head.split(" ")[0] # get info what http request method was used

    if http_req_method == "POST":
        # since it is POST, use PRG-pattern!
        response = ("HTTP/1.1 303 See Other\r\n"
                    "Connection: close\r\n"
                    "Content-Type: text/html; charset=UTF-8\r\n"
                     "Set-Cookie: kontostand={:5.2f}\r\n"
                    "Location: /\r\n"
                    "\r\n".format(kontostand))

    else:
        response = ("HTTP/1.1 200 OK\r\n"
                    "Connection: close\r\n"
                    "Content-Type: text/html; charset=UTF-8\r\n"
                    "Set-Cookie: kontostand={:5.2f}\r\n"
                    "\r\n"
                    "<html><head><title>Konto</title></head>\r\n"
                    "<body><h1>Konto</h1><hr/>\r\n".format(kontostand))

    if 'amount' in values:
        response += "<p>&Uuml;berwiesen = {:5.2f}</p>\r\n".format(amount) # Ue
    response += ("<p>Neuer Kontostand = {:5.2f}</p>\r\n"
                "<form method=\"POST\">\r\n" # form to send the data (amount of money)
                "<p>Betrag zum &Uuml;berweisen: "
                "<input type=\"text\" name=\"amount\"/></p>\r\n" # Ue
                "<p><input type=\"submit\" value=\"Abschicken\"/></p>\r\n"
                "</form>\r\n"
                "</body></html>\r\n".format(kontostand))

    conn.send(response.encode())
    conn.close()
    return

if __name__ == "__main__":
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    s.bind((TCP_IP, TCP_PORT))
    s.listen(1)

    # endless loop accepting & handling requests
    while 1:
        conn, addr = s.accept()
        handleRequest(conn)
