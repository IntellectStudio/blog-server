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
    this.instance.use(bodyParser.urlencoded({ extended: true }))
    this.instance.use(bodyParser.json())
    this.instance.use(cookieParser())
    this.instance.use(morgan(':method :url :status :res[content-length] - :response-time ms', {stream: stream}))
    this.instance.use(compression())
    this.instance.use(helmet())
    this.instance.use(cors())

    this.instance.set('views', path.join(__dirname, '../src/views'))
    const hbsInstance: Exphbs = handlebars.create({
      // Specify helpers which are only registered on this instance.
      helpers: {
          iter: (context: object[], options: {fn: Function; inverse: Function}): string => {
            const fn: Function = options.fn
            const inverse: Function = options.inverse
            let ret: string = ''

            if (context && context.length > 0) {
              for (let i: number = 0; i < context.length; i = i + 1) {
                ret = ret + fn({
                  ...context[i],
                  i: i,
                  iPlus1: i + 1
                })
              }
            } else {
              ret = inverse(this)
            }

            return ret
          }
      },
      defaultLayout: 'main',
      layoutsDir: path.join(__dirname, '../src/views/layouts')
  })
    this.instance.engine('handlebars', hbsInstance.engine)
    this.instance.set('view engine', 'handlebars')
    if (process.env.NODE_ENV === 'production') {
      this.instance.enable('view cache')
    }

    logger.debug('Application configured...... ')
  }

  private routes(): void {
    // set up routes

    // set up error handling
    this.instance.get('/', (req: express.Request, res: express.Response) => {
      res.json({
        mode: process.env.NODE_ENV,
        logpath: process.env.LOG_PATH
      })
    })

    this.instance.use('/logs', logsRouter)

    // set up mapping for docs
    this.instance.use('/docs', express.static(path.join(__dirname, 'docs')))

    logger.debug('Application routers installed......')
  }
}

export const app: express.Application = new App().instance
