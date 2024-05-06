import { User } from '../entities/user.entity';

/**
 * Data Transfer Object (DTO) representing a user.
 * Used for transferring user data throughout the application
 * in a controlled format, encapsulating the user entity.
 */
export class UserDto {
  readonly id: number;
  readonly email: string;
  readonly name: string;

  /**
   * Constructs a new `UserDto` instance from a user entity.
   * @param user The user entity from which to construct the DTO.
   */
  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
  }
}

export class UserObjectDto {
  readonly id: number;
  readonly email: string;
  readonly name: string;
  readonly phoneNumber :string;
  readonly userName : string ;

  /**
   * Constructs a new `UserDto` instance from a user entity.
   * @param user The user entity from which to construct the DTO.
   */
  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.phoneNumber = user.phoneNumber;
    this.userName = user.username;
  }
}