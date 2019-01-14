import * as bodyParser from 'body-parser'
import * as compression from 'compression'
import * as cookieParser from 'cookie-parser'
import * as cors from 'cors'
import * as express from 'express'
import * as handlebars from 'express-handlebars'
import * as helmet from 'helmet'
import * as morgan from 'morgan'
import * as path from 'path'
import { logger, stream } from './middlewares/winston'
import { logsRouter } from './routers/logsRouter'

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
    // what is body parser
    this.instance.use(bodyParser.urlencoded({ extended: true }))
    this.instance.use(bodyParser.json())
    // what is cookie parser
    this.instance.use(cookieParser())
    this.instance.use(morgan(':method :url :status :res[content-length] - :response-time ms', {stream: stream}))
    this.instance.use(compression())
    this.instance.use(helmet())
    this.instance.use(cors())

    this.instance.set('views', path.join(__dirname, '../src/views'))
    this.instance.engine('handlebars', handlebars({
      defaultLayout: 'main',
      layoutsDir: path.join(__dirname, '../src/views/layouts')
    }))
    this.instance.set('view engine', 'handlebars')

    logger.info('Application configured...... ')
  }

  private routes(): void {
    this.instance.get('/', (req: express.Request, res: express.Response) => {
      res.json({
        mode: process.env.NODE_ENV,
        logpath: process.env.LOG_PATH
      })
    })

    this.instance.use('/logs', logsRouter)
    this.instance.use('/docs', express.static(path.join(__dirname, 'docs')))

    logger.info('Application routers installed......')
  }
}

export const app: express.Application = new App().instance
