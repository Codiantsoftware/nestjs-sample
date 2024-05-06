import { Module } from '@nestjs/common';
import { FeaturesModule } from './features/features.module';
import { DatabaseModule } from './config/database/database.module';

@Module({
  imports: [
    FeaturesModule,
    DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
