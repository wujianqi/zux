import { Controller, Get } from '../../src'
import { Context } from 'koa';

@Controller('/hello')
export default class IndexController {

  @Get('/')
  async hello(ctx:Context) {
      ctx.body = 'Hello World'
  }

  @Get('/list')
  async list(ctx:Context) {
      ctx.body = 'Hello World2'
  }
  
}
