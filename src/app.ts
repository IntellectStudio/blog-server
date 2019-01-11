import * as bodyParser from 'body-parser'
import * as compression from 'compression'
import * as cookieParser from 'cookie-parser'
import * as cors from 'cors'
import * as express from 'express'
import * as helmet from 'helmet'
import * as mongoose from 'mongoose'
import * as morgan from 'morgan'
import { logger, stream } from './middlewares/winston'

class App {
  public instance: express.Application
  public name: String

  constructor() {
    this.name = 'Blog Server'
    this.instance = express()
    this.config()
    this.routes()
  }

  private config(): void {
    // dotenv.config()
    this.instance.use(bodyParser.urlencoded({ extended: true }))
    this.instance.use(bodyParser.json())
    this.instance.use(cookieParser())
    this.instance.use(morgan(':method :url :status :res[content-length] - :response-time ms', {stream: stream}))
    this.instance.use(compression())
    this.instance.use(helmet())
    this.instance.use(cors())

    logger.info('Application configured...... ')
  }

  private routes(): void {
    this.instance.use('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
      throw new Error('yayayay')
      res.json({
        data: 11,
        mode: process.env.NODE_ENV,
        logpath: process.env.LOG_PATH,
        say: 'yes'
      })
    })
    logger.info('Application routers installed......')
  }
}

export const app: express.Application = new App().instance
