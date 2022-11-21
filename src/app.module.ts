import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios'
import { Agent } from 'https';
import { ConfigModule, ConfigService } from '@nestjs/config';

const http_module = HttpModule.register({
  httpsAgent: new Agent({
    rejectUnauthorized: false,
  }),
});
const envConfigPath = {
  dev: `.env.development`, // dev环境配置
  uat: `.env.uat`, // uat环境配置
  prod: `.env.production`, // prod环境配置
};
const config_module = ConfigModule.forRoot({
  envFilePath: `.env.development`,
  isGlobal: true,
  cache: true,
});

@Module({
  imports: [CatsModule, UserModule, UploadModule, LoginModule,http_module,config_module,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3309,
      username: 'root',
      password: '123456',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件
      synchronize: true,
      retryDelay:500, //重试连接数据库间隔
      retryAttempts:10,//重试连接数据库的次数
      autoLoadEntities:true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
 
}
