import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'
// import {Request, Response, NextFunction} from 'express'
import * as cors from 'cors'
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ResponseData } from './common/reseponse'
import { HttpFilter } from './common/filter'
import { VersioningType, ValidationPipe} from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

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
  // 配置静态文件路径
  app.useStaticAssets(join(__dirname,'images'),{
    prefix: '/tiger'
  })
  // 解决浏览器跨域
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
  app.useGlobalFilters(new HttpFilter())
  app.useGlobalInterceptors(new ResponseData())
  app.useGlobalPipes(new ValidationPipe())

  const options = new DocumentBuilder().setTitle('Tiger Test Api').setDescription('本地测试api').setVersion('1').build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/api-docs',app,document)
  await app.listen(5000);
}
bootstrap();
