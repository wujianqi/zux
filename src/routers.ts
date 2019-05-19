import * as Router from 'koa-router';
import * as compose from 'koa-compose';
import { Context } from 'koa';
import constant from './constant';
import { jsonMiddleware } from './middleware';

interface IController {
  new(): any;
}

/**
 * json 方法适配
 * @param fnc 
 */
function jsonAdapter(fnc){
  return async (ctx:Context, next: () => Promise<any>) => {
    ctx.data = await fnc();
  }
}

/**
 * 从控制器类成员方法，获取路由属性挂载
 * @param router 
 * @param fnc
 * @param isJSON
 */
function getPorpRouter(router:Router, fnc:Function, isJSON:boolean = false):void {
  const url = Reflect.getMetadata(constant.PATH, fnc);
  const method = Reflect.getMetadata(constant.METHOD, fnc);
  let middleware = Reflect.getMetadata(constant.MIDDLEWARE, fnc);  

  if(isJSON) { // 查找是否为JSON类型控制器
    middleware = middleware || [];
    middleware.push(jsonMiddleware);
  }
  if(method && url && fnc){ // 挂载路由
    if(middleware) router[method](url, ...middleware, isJSON ? jsonAdapter(fnc): fnc);
    else router[method](url, fnc);
  }
}


/**
 * 从控制器类，获取路由对象
 * @param Instance 控制器类
 */
function getRouter(Instance: IController) {
  const prototype = Object.getPrototypeOf(new Instance());
  const methodsKeys = Object.getOwnPropertyNames(prototype)
  .filter(item => item!=='constructor' && typeof prototype[item] === 'function'); 

  let isJSONType = Reflect.getMetadata(constant.JSONTYPE, Instance) || false;
  let router = new Router({
    prefix: Reflect.getMetadata(constant.PREFIX, Instance)
  }); 

  methodsKeys.forEach(key => getPorpRouter(router, prototype[key], isJSONType));
  return router;
}

 const routerDecorator = {
  routers: <Router[]>[],

  /**
   * 注册控制器
   */
  reg: (controller: Array<IController> | IController) => {
    if (Array.isArray(controller)) controller.forEach(c => {
      routerDecorator.routers.push(getRouter(c));
    });
    else routerDecorator.routers.push(getRouter(controller));
    return routerDecorator;
  },

  /**
   * 挂载外部路由中间件
   * @param middleware
   */
  use: (...middlewares:any[]) => {
    routerDecorator.routers.forEach(r => {
      middlewares.forEach(m => r.use(m))
    })
    return routerDecorator;
  },

  /**
   * 挂载全部路由
   */
  compose: () => {
    let rts = [];

    routerDecorator.routers.forEach(r => {
      rts.push(r.routes());
      rts.push(r.allowedMethods());
    })
    return compose(rts);
  }
}

export default routerDecorator;
