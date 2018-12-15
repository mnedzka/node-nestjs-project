import { Injectable } from '@nestjs/common';
import { TokenPayloadDto } from '../dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  private jwtSecret = 'secret';

  tokenSign(payload: TokenPayloadDto) {
    return jwt.sign(payload, this.jwtSecret);
  }

  tokenDecode(token: string): TokenPayloadDto {
    return jwt.decode(token) as TokenPayloadDto;
  }
}
