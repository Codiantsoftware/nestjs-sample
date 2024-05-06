import { UserDto,UserObjectDto } from './user.dto';
import { User } from '../entities/user.entity';

export class SingleUserResponseDto {
  status: boolean;
  message: string;
  data: UserDto;
  constructor(user: User, message?: string) {
    this.status = true;
    this.message = message;
    this.data = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}

export class UserResponseDto {
  token: string;
  status: boolean;
  message: string;
  data: UserDto;
  constructor(user: User, token?: string, message?: string) {
    this.status = true;
    this.message = message;
    this.data = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    this.token = token ? token : null;
  }
}

export class ResponseDto {
  status: boolean;
  message: string;
  data: UserObjectDto;
  constructor(user: User, message?:string) {
      this.status = true; 
      this.message = message;
      this.data = {
        id: user.id,
        email: user.email,
        name: user.name,
        phoneNumber:user.phoneNumber,
        userName:user.username
      };
  }
}