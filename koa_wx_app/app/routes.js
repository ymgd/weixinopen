/**
 * Created by lichun on 2016/11/15.
 */
import Router from 'koa-router'
import {pullStaticCode} from './tools/webhooks'

let route = new Router
route.post('/webhooks/pullstaticcode', async (ctx)=>{
    let stdout = await pullStaticCode()
    ctx.body = stdout
})
route.get('/api/hello', (ctx)=> {
    ctx.body = {success:'I love you'}
})


export default function (app) {
    app.use(route.routes())
    app.use(route.allowedMethods())
}