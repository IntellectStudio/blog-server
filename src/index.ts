import * as http from 'http'
import { app } from './app'

app.set('port', 3000)

const instance: http.Server = http.createServer(app)

instance.listen(3000)
