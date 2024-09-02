import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [HomeController],
  providers: [HomeService],
  imports: [DatabaseModule],
})
export class HomeModule {}
