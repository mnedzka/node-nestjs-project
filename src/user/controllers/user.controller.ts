import { Controller, Get, Query, Request, Post, Body } from '@nestjs/common';
import { UserRegisterRequestDto, UserRegisterResponseDto } from '../dto';
import { resolve } from 'dns';
import { UserModel } from 'src/models';

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

  @Post('stats')
  postUser(@Body() body: any) {
    return {
      id: 1,
      name: 'piotr',
      body,
    };
  }

  private user: UserModel;

  @Post('register')
  async register(@Body() data: UserRegisterRequestDto): Promise<UserRegisterResponseDto> {

    this.user = {
      id: 1,
      name: data.name,
      email: data.email,
    };

    return {
      user: this.user,

    };
  }
}

function delay(time = 2000) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('GO');
    }, time);
  });
}
