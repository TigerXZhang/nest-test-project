import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
// import { ConfigModule } from './config/config.module';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly userService: UserService
    // private readonly configModule: ConfigModule
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('abc')
  getUser(): string {
    return this.userService.findAll();
  }

}


