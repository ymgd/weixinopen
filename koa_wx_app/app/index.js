import Koa from 'koa'
import routing from './routes'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import staticCache from 'koa-static-cache'
import path from 'path'
import cors from './middleware/cors'
const app = new Koa();
app.use(cors)
app.use(logger())
// app.use(staticCache(path.join(__dirname, '../static'),{
app.use(staticCache('/home/project/sampsonapp/dist/',{
    gzip: true,
    maxAge: 60 * 30
}))
app.use(bodyParser())
routing(app)
export default app

