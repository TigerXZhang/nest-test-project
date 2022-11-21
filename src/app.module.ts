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

const data_module = TypeOrmModule.forRootAsync({
  name: 'default',
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get<string>('DATA_HOST'),
    port: Number(configService.get('DATA_PORT')),
    database: configService.get<string>('DATA_DATABASE'),
    username: configService.get<string>('DATA_USERNAME'),
    password: configService.get<string>('DATA_PASSWORD'),
    extra: {
      trustServerCertificate: true,
    },
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    logging: 'all',
    retryDelay:500, //重试连接数据库间隔
    retryAttempts:10,//重试连接数据库的次数
    synchronize: false, //synchronize: true 不能被用于生产环境，否则您可能会丢失生产环境数据
    autoLoadEntities:true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
  }),
  inject: [ConfigService],
});

const appcenter_module = TypeOrmModule.forRootAsync({
  name: 'appcenter',
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'mssql',
    host: configService.get<string>('APPCENTER_HOST'),
    port: Number(configService.get('APPCENTER_PORT')),
    database: configService.get<string>('APPCENTER_DATABASE'),
    username: configService.get<string>('APPCENTER_USERNAME'),
    password: configService.get<string>('APPCENTER_PASSWORD'),
    extra: {
      trustServerCertificate: true,
    },
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    logging: 'all',
    retryDelay:500, //重试连接数据库间隔
    retryAttempts:10,//重试连接数据库的次数
    synchronize: false, //synchronize: true 不能被用于生产环境，否则您可能会丢失生产环境数据
    autoLoadEntities:true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
  }),
  inject: [ConfigService],
});

@Module({
  imports: [CatsModule, UserModule, UploadModule, LoginModule, http_module, config_module, data_module, appcenter_module],
  controllers: [AppController],
  providers: [AppService]
})



export class AppModule {
 
}
