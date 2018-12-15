import { Controller, Get, Query, Request, Post, Body, HttpException, HttpStatus, NotFoundException, ForbiddenException } from '@nestjs/common';
import { UserRegisterRequestDto, UserRegisterResponseDto, UserLoginResponseDto, UserLoginRequestDto } from '../dto';
import { UserModel } from 'src/models';
import { UserService } from '../services/user.services';

@Controller('user')
export class UserController {

  constructor(private userService: UserService) { }

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

  @Post('login')
  async login(@Body() data: UserLoginRequestDto): Promise<UserLoginResponseDto> {
    if (!this.user) {
      // throw new HttpException('not found', HttpStatus.NOT_FOUND);
      throw new NotFoundException('Sorry user not found');
    }
    if (this.user.password !== data.password || this.user.email !== data.email) {
      // throw new ForbiddenException();
      throw new HttpException('invalid credentials', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return {
      token: this.userService.tokenSign({
        user: this.user,
      }),
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
