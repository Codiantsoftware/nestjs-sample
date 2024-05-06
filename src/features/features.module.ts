import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';

/**
 * Defines the features module, bundling user and admin modules for the application.
 * @module FeaturesModule
 */
@Module({
  imports: [UserModule, AdminModule],
  controllers: [],
  exports: [UserModule, AdminModule],
})
export class FeaturesModule {}
