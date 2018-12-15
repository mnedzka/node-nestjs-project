import { Controller, Get, Query, Request, Post, Body, HttpException, HttpStatus, NotFoundException, ForbiddenException } from '@nestjs/common';
import { UserRegisterRequestDto, UserRegisterResponseDto, UserLoginRequestDto, UserLoginResponseDto } from '../dto';
import { UserModel } from 'src/models';
import { UserService } from '../services/user.services';

@Controller('user')
export class UserController {

  constructor(private userService: UserService) { }

  @Get('stats')
  async getUser(@Query() query: any, @Request() req) {
    // console.log('REQ ON URL', req.url);

    // let myData;
    // try {
    //    myData = await delay<UserModel>(3000, {name: 'piotr', id: 1}).then(data2 => {
    //     // console.log('DATA', data2);
    //     return {
    //       user: data2,
    //     };
    //   });

    // } catch (error) {
    //   return {
    //     error,
    //     user: null,
    //   };
    // }
    // .catch(err => {
    //   console.log('ERR', err);
    //   return {
    //     user: null,
    //   };
    // });

    return {
      id: 1,
      name: 'piotr',
      query,
      // myData,
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
      password: data.password,
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

function delay<T>(time = 2000, data: T): Promise<T> {
  return new Promise((resolve, reject) => {
    // console.log('CREATE PROMISE');
    if (time > 2000) {
      reject('TOO LONG');
    } else {
      setTimeout(() => {
        resolve(data);
      }, time);
    }

  });
}
