import constant from './constant';

/**
 * 取控制器类装饰
 * @param prefix 路径前缀
 */
export const Controller = (prefix?: string): ClassDecorator => {
  prefix = prefix || '/';
  return target => Reflect.defineMetadata(constant.PREFIX, prefix, target);
}

/**
 * 取控制器类装饰（JSON API类型）
 * @param prefix 路径前缀
 */
export const JsonController = (prefix?: string): ClassDecorator => {
  prefix = prefix || '/';
  return target => {
    Reflect.defineMetadata(constant.PREFIX, prefix, target);
    Reflect.defineMetadata(constant.JSONTYPE, true, target);
  }
}
 
const createDecoratorMap = (method: string) => (path: string): MethodDecorator => {
  return (target, key, descriptor) => {
    Reflect.defineMetadata(constant.PATH, path, descriptor.value);
    Reflect.defineMetadata(constant.METHOD, method, descriptor.value);
  }
}

export const Get = createDecoratorMap('get');
export const Post = createDecoratorMap('post');
export const Put = createDecoratorMap('put');
export const Patch = createDecoratorMap('patch');
export const Del = createDecoratorMap('del');
export const Delete = createDecoratorMap('delete');
export const All = createDecoratorMap('all');
export const Head = createDecoratorMap('head');
export const Options = createDecoratorMap('options');

/**
 * 
 * @param middleware 路由中间件
 */
export const Middleware = (...middleware: any[]) => {
  return (target, key, descriptor) => {
    Reflect.defineMetadata(constant.MIDDLEWARE, middleware, descriptor.value);
  }
}