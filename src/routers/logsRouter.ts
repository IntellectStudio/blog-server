import { NextFunction, Request, Response, Router } from 'express'
import * as fs from 'fs'
import * as moment from 'moment'
import * as path from 'path'
import { logger } from '../middlewares/winston'

interface ILogItem {
  message ?: string,
  level: string,
  timestamp: string
}

const getLogs: (filename: string) => Promise<Buffer> = (filename: string): Promise<Buffer> => {
  return new Promise((resolve: (data: Buffer) => void, reject: (err: NodeJS.ErrnoException) => void): void => {
    fs.readFile(path.join(process.env.LOG_PATH, filename), 'utf-8', (err: NodeJS.ErrnoException, data: Buffer) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

const parseLog: (files: Buffer) => ILogItem[] = (files: Buffer): ILogItem[] => {
  return files
  .toString()
  .split('\n')
  .filter((line: string) => !!line)
  .map((line: string) => {
    const logItem: ILogItem = JSON.parse(line)

    return {
      level: logItem.level.toUpperCase(),
      message: logItem.message,
      timestamp: moment(new Date(logItem.timestamp)).format('YYYY/MM/DD h:mm a')
    }
  })
  .sort((a: ILogItem, b: ILogItem) => {
    return moment(a.timestamp).diff(moment(b.timestamp)) < 0 ? 1 : -1
  })
}

const logsRouter: Router = Router()

logsRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  getLogs('all-logs.log')
  .then(parseLog)
  .then((results: ILogItem[]) => {
    res.render('logs', {
      logs: results
    })
  })
  .catch((err: NodeJS.ErrnoException) => {
    logger.error(err)
  })
})

logsRouter.get('/error', (req: Request, res: Response, next: NextFunction) => {
  getLogs('error-logs.log')
  .then(parseLog)
  .then((results: ILogItem[]) => {
    res.render('logs', {
      logs: results
    })
  })
  .catch((err: NodeJS.ErrnoException) => {
    logger.error(err)
  })
})
export { logsRouter }
