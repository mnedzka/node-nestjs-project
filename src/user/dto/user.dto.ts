import { UserModel } from 'src/models';

export interface UserRegisterRequestDto {
  name: string;
  password: string;
  email: string;
}

export class UserRegisterResponseDto {
  user: UserModel;
}
