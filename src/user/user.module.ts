import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Logger } from '../middleware/index'
import { HttpModule } from '@nestjs/axios'
import { Users } from './entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Users],'appcenter')],
  controllers: [UserController],
  providers: [UserService,ConfigService],
  exports: [UserService]
})

// user模块中间件拦截，如配置白名单等
export class UserModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    // 三种拦截方式： 字符串，对象配置，UserController控制器
    consumer.apply(Logger).forRoutes({
      path: '/v1/user',
      method: RequestMethod.GET
    })
  }
}
