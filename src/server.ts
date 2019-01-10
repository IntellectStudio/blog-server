import * as bodyParser from 'body-parser'
import * as compression from 'compression'
import * as cookieParser from 'cookie-parser'
import * as cors from 'cors'
import * as express from 'express'
import * as helmet from 'helmet'
import * as mongoose from 'mongoose'
import * as logger from 'morgan'

class Server {
  public app: express.Application

  constructor() {
    this.app = express()
    this.config()
    this.routes()
  }

  public config(): void {
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json())
    this.app.use(cookieParser())
    this.app.use(logger('dev'))
    this.app.use(compression())
    this.app.use(helmet())
    this.app.use(cors())
  }

  public routes(): void {
    this.app.use('/', (req: express.Request, res: express.Response) => {
      res.json({
        data: 2
      })
    })
  }
}
export const server: express.Application = new Server().app
