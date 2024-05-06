import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { usersProviders } from './users.providers';
import { DatabaseModule } from '../../config/database/database.module';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...usersProviders],
  exports: [UserService],
})
export class UserModule {}
