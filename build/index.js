"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var server_1 = require("./server");
server_1.default.set('port', 3000);
var server = http.createServer(server_1.default);
server.listen(3000);
