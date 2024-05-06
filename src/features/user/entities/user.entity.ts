import {
  Table,
  Column,
  Model,
  Unique,
  IsEmail,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  tableName: 'user',
})
export class User extends Model<User> {
    
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Unique
  @IsEmail
  @Column
  email: string;

  @Column
  password: string;

  @Column
  name: string;

  @Column
  username: string;

  @Column({ field: 'phone_number' })
  phoneNumber: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
