import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType} from '@nestjs/common'
import * as session from 'express-session'
import {Request, Response, NextFunction} from 'express'
import * as cors from 'cors'
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ResponseData } from './config/reseponse'

// 全局白名单跳转，token健全等
// const whiteList = ['/v1/user', '/upload/album', '/upload/export']
// function globalMiddleWare(req:Request, res:Response, next:NextFunction) {
//   console.log(req.originalUrl);
//   if (whiteList.includes(req.originalUrl)){
//     next()
//   } else {
//     res.send('无权限，请联系管理员')
//   }
// }

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname,'images'),{
    prefix: '/tiger'
  })
  app.use(cors())
  // 配置版本信息，user controller.ts配置
  app.enableVersioning({
    type: VersioningType.URI
  })
  // 配置session, 如验证码从此处去取
  app.use(session({
    secret: 'tiger',
    rolling: true, // 每次请求时间重新计算
    name: 'tiger.sid',
    cookie: {
      maxAge: 888888
    }
  }))
  // app.use(globalMiddleWare)
  app.useGlobalInterceptors(new ResponseData())
  await app.listen(5000);
}
bootstrap();
