import "reflect-metadata";
import * as Koa from 'koa';
import controllers from './controllers';
import { routers } from '../';

const app = new Koa();

// 注册控制器
app.use(routers.at(controllers).compose());

app.listen(3000);
console.log("Koa application is up and running on port 3000");

app.on('error',(err) => {
  console.error('server error', err.message);
  console.error(err);
});
