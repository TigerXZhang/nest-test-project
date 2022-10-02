import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType} from '@nestjs/common'
import * as session from 'express-session'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI
  })
  app.use(session({
    secret: 'tiger',
    rolling: true,
    name: 'tiger.sid',
    cookie: {
      maxAge: 888888
    }
  }))
  await app.listen(5000);
}
bootstrap();
