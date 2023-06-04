import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  public home() {
    return 'Homepage';
  }
}
