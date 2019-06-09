import constant from './constant';
import { MakerSetting } from 'shai/lib/maker.esm';

export const Mock = (config: MakerSetting): ClassDecorator => {
  return target => Reflect.defineMetadata(constant.MOCK_OPTION, config, target);
}

export const Ref = (rule: string, ...args:any[]): PropertyDecorator => {
  return (target, key) => 
    Reflect.defineMetadata(constant.MOCK, rule, key);
}
