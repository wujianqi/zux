import constant from './constant';
import { ValidSetting, IChain } from 'shai/lib/validator.esm';

export const Validator = (config: ValidSetting): ClassDecorator => {
  return target => Reflect.defineMetadata(constant.VALID_OPTION, config, target);
}

export const Type = (chain: IChain): PropertyDecorator => {
  return (target, key) => 
    Reflect.defineMetadata(constant.VALID_STRUCT, chain, key);
}
