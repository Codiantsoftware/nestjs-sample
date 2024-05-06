import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  SingleUserResponseDto,
  UserResponseDto,
  ResponseDto,
} from './dto/user-create-response-data.dto';
import { HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Handles the user registration process.
   * @param {CreateUserDto} createUserData - The user data for creating a new account.
   * @returns {Promise<SingleUserResponseDto>} The response data including user details.
   * @throws {HttpException} If the user creation fails, throws an exception with a corresponding message and status code.
   */
  @Post('signup')
  public async signup(
    @Body() createUserData: CreateUserDto,
  ): Promise<SingleUserResponseDto> {
    const result: SingleUserResponseDto =
      await this.userService.signUp(createUserData);

    if (!result.status) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  /**
   * Handles user login requests.
   * @param {UserLoginRequestDto} userLoginRequestDto - The data required for logging in a user.
   * @returns {Promise<UserResponseDto>} The response data including login details.
   */
  @Post('login')
  @HttpCode(200)
  public async login(
    @Body() userLoginRequestDto: UserLoginRequestDto,
  ): Promise<UserResponseDto> {
    return this.userService.login(userLoginRequestDto);
  }

  /**
   * Updates user information.
   * @param {UpdateUserDto} updateUserDto - Data to update the user profile.
   * @param request - The request object.
   * @param {string} id - The ID of the user to update.
   * @returns {Promise<ResponseDto>} The response data after updating the user.
   * @throws {HttpException} If the update operation fails.
   */
  @Put('me/:id')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiOkResponse({ type: ResponseDto })
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Req() request,
    @Param() params: { id: string },
  ): Promise<ResponseDto> {
    try {
      const updatedUser = await this.userService.update(params.id, updateUserDto);
      return updatedUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
