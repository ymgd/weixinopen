const path = require('path');
const koa = require('koa');
const router = require('koa-router')();
const staticResources = require('koa-static');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');

const app = koa();

app.use(bodyParser());
app.use(staticResources(path.join(__dirname, '../www/')));

render(app, {
  root: path.join(__dirname, '../www/'),
  layout: false,
  viewExt: 'html',
  debug: true,
  cache: false
});

router.get('/', function *() {
	yield this.render('index');
});

router.get('*', function *(){
	yield this.render('index');
});

app.use(router.routes());

app.listen(8888,null,function(){
	console.log('Listening at http://localhost:8888');
});
