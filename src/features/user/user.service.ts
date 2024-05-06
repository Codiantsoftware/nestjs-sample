import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { genSalt, hash, compare } from 'bcrypt';
import { User } from './entities/user.entity';
import {
  SingleUserResponseDto,
  UserResponseDto,
  ResponseDto,
} from '../user/dto/user-create-response-data.dto';
import { Messages } from '../../language/en';
import { config as dataBaseType } from '../../../db/database';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { JwtPayload } from './authentication/jwt-strategy';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UserService {
  private readonly jwtPrivateKey: string;
  /**
   * Constructs the user service and initializes dependencies.
   * @param {typeof User} usersRepository - The users repository for database operations.
   */
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: typeof User,
  ) {
    this.jwtPrivateKey = dataBaseType.jwtPrivateKey;
  }

  /**
   * Registers a new user with the provided user details.
   * @param {CreateUserDto} createUserDto - The user data for creating a new account.
   * @returns {Promise<SingleUserResponseDto>} A promise that resolves with the user registration response.
   * @throws {HttpException} If user registration fails.
   */
  async signUp(createUserDto: CreateUserDto) {
    try {
      const saltRound = await genSalt(10);
      const passwordHash = await hash(createUserDto.password, saltRound);
      const userFind = await User.findOne({
        where: { email: createUserDto.email.trim().toLowerCase() },
      });
      if (userFind) {
        throw new HttpException(Messages.ALREADY_REGISTER, HttpStatus.CONFLICT);
      }
      const user = new User({
        email: createUserDto.email.trim().toLowerCase(),
        name: createUserDto.name,
        password: passwordHash,
      });

      const userSave = await user.save();
      return new SingleUserResponseDto(userSave, Messages.SIGNUP);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Authenticates a user based on email and password.
   * @param {UserLoginRequestDto} userLoginRequestDto - The login request data.
   * @returns {Promise<UserResponseDto>} A promise that resolves with the user login response, including a JWT token.
   * @throws {HttpException} If authentication fails.
   */
  async login(userLoginRequestDto: UserLoginRequestDto) {
    try {
      const email = userLoginRequestDto.email;
      const password = userLoginRequestDto.password;

      const user = await this.getUserByEmail(email);
      if (!user) {
        throw new HttpException(
          Messages.WRONG_CREDENTIAL,
          HttpStatus.BAD_REQUEST,
        );
      }

      const isMatch = await compare(password, user.password);
      if (!isMatch) {
        throw new HttpException(
          Messages.INVALID_PASSWORD,
          HttpStatus.BAD_REQUEST,
        );
      }

      const token = await this.signToken(user);
      return new UserResponseDto(user, token, Messages.LOGIN_SUCCESS);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Updates user information based on the provided data.
   * @param {string} id - The ID of the user to update.
   * @param {UpdateUserDto} updateUserDto - Data to update the user profile.
   * @returns {Promise<ResponseDto>} A promise that resolves with the update operation response.
   * @throws {HttpException} If the update operation fails.
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<ResponseDto> {
    try {
      const userId = id.startsWith(':') ? id.slice(1) : id;
      const user = await this.getUserById(parseInt(userId));
      if (!user) {
        throw new HttpException(Messages.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
      const [updatedRowsCount] = await User.update(
        {
          name: updateUserDto.name,
          phoneNumber: updateUserDto.phoneNumber,
          username: updateUserDto.userName,
        },
        {
          where: { id: userId },
        },
      );
      const updatedUser = await this.getUserById(parseInt(userId));
      if (updatedRowsCount > 0) {
        return new ResponseDto(updatedUser, Messages.PROFILE_UPDATED);
      } else {
        throw new HttpException(Messages.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Retrieves a user by their email address.
   * @param {string} email - The email address of the user to find.
   * @returns {Promise<User>} A promise that resolves with the found user entity.
   */
  async getUserByEmail(email: string) {
    return await this.usersRepository.findOne<User>({
      where: { email },
    });
  }

  /**
   * Generates a JWT token for a user.
   * @param {User} user - The user entity for which to generate the token.
   * @returns {Promise<string>} A promise that resolves with the generated JWT token.
   */
  async signToken(user: User) {
    const payload: JwtPayload = {
      email: user.email,
    };

    return sign(payload, this.jwtPrivateKey, {});
  }

  async getUserById(id: number) {
    return await User.findOne({ where: { id } });
  }
}
