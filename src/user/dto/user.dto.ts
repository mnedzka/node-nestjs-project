import { UserModel } from 'src/models';

export interface UserRegisterRequestDto {
  name: string;
  password: string;
  email: string;
}

export class UserRegisterResponseDto {
  user: UserModel;
}

export interface UserLoginRequestDto {
  password: string;
  email: string;
}

export class UserLoginResponseDto {
  user: UserModel;
  token: string;
}

export interface TokenPayloadDto {
  user: UserModel;
}
