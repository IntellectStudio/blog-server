import * as http from 'http'
import Server from './server'

Server.set('port', 3000)

const server = http.createServer(Server)

server.listen(3000)
