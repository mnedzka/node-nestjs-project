import { Controller, Get, Query, Request } from '@nestjs/common';

@Controller('user')
export class UserController {

  @Get('stats')
  getUser(@Query() query: any, @Request() req) {
    return {
      id: 1,
      name: 'piotr',
      query,
    };
  }
}
