import { IsString, IsEmail, MinLength } from 'class-validator';

/**
 * Data Transfer Object (DTO) for creating a new user.
 * Ensures that the incoming request data for user creation
 * adheres to a specified format and validation rules.
 */
export class CreateUserDto {
  /**
   * User's email address.
   * Must be a valid email format.
   */
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  /**
   * User's password.
   * Must be a string with a minimum length of 6 characters.
   */
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  readonly password: string;

  /**
   * User's full name.
   */
  @IsString()
  readonly name: string;
}
