import { StreamOptions } from 'morgan'
import {createLogger, format, Logger, transports } from 'winston'

export const logger: Logger = createLogger({
  // Levels: error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5
  transports: [
      new transports.File({
          level: 'info',
          filename: './logs/all-logs.log',
          handleExceptions: true,
          maxsize: 5242880, //5MB
          maxFiles: 5,
          format: format.combine(
            format.json()
          )
      }),
      new transports.File({
        level: 'error',
        filename: './logs/error-logs.log',
        handleExceptions: true,
        maxsize: 5242880, //5MB
        maxFiles: 5,
        format: format.combine(
          format.json()
        )
    }),
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
    logger.info(message)
  }
}
