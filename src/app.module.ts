import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { UserModule } from './user/user.module';
import { CatsService } from './cats/cats.service'
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [CatsModule, UserModule, UploadModule],
  controllers: [AppController],
  providers: [AppService,CatsService],
})
export class AppModule {}
