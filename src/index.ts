import * as http from 'http'
import {AddressInfo} from 'net'
import { app } from './app'
import { logger } from './middlewares/winston'
const port: number = normalizePort(process.env.PORT || 3000)
app.set('port', port)

const instance: http.Server = http.createServer(app)

instance.listen(port)
instance.on('error', onError)
instance.on('listening', onListening)

function normalizePort(val: number | string): number {
  if (typeof val === 'string') {
    return parseInt(val, 10)
  } else {
    return val
  }
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error
  }
  switch (error.code) {
    case 'EACCES':
      logger.error(`Port ${port} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      logger.error(`Port ${port} is already in use`)
      process.exit(1)
      break
    default:
      logger.error(error)
      throw error
  }
}

function onListening(): void {
  const addr: AddressInfo | string  = instance.address()
  const bind: string = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
  logger.info(`Application starts on port ${port}......`)
}
