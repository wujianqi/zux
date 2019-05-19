import {JsonController, Get} from '../../src'

@JsonController('/test')
export default class IndexController {

  @Get('/')
  async test() {
    return {
      test1: 111,
      test2: 'abc'
    }
  }
}
