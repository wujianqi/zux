import { Context } from 'koa';

/**
 * JSON格式响应
 */
export async function jsonMiddleware(ctx:Context, next){
  await next();
  ctx.set("Content-Type", "application/json");
  ctx.body = JSON.stringify(ctx.data);  
}
