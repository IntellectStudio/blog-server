import * as fs from 'fs'
import { StreamOptions } from 'morgan'
import * as path from 'path'
import {createLogger, format, Logger, transports } from 'winston'

/**
 * check if process.env.LOG_PATH exists
 * if target folder does not exists, create one
 */
const checkLogsFolder: () => void = (): void => {
  const isExists: boolean = fs.existsSync(process.env.LOG_PATH)
  if (!isExists) {
    fs.mkdirSync(process.env.LOG_PATH)
  }
}

checkLogsFolder()

const makeFileTransportOption: Function = (logginLevel: string, filename: string): transports.FileTransportOptions => {
  return {
    level: logginLevel,
    filename: path.join(process.env.LOG_PATH, filename),
    handleExceptions: true,
    maxsize: 5242880, //5MB
    maxFiles: 5,
    format: format.combine(
      format.timestamp(),
      format.json(),
    )
  }
}

/**
 * winston logging config
 */
export const logger: Logger = createLogger({
  // Levels: error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5
  transports: [
      new transports.File(makeFileTransportOption('info', 'all-logs.log')),
      new transports.File(makeFileTransportOption('error', 'error-logs.log')),
      new transports.Console({
          level: 'debug',
          handleExceptions: true,
          format: format.combine(
            format.colorize(),
            format.simple()
          )
      })
  ],
  exitOnError: false
})

export const stream: StreamOptions = {
  write: (message: string): void => {
    logger.debug(message)
  }
}
