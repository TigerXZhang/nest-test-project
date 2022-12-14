import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, Headers, Req, Res, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { request } from 'http';
import * as svgCaptche from 'svg-captcha'
import { sign } from 'crypto';
import { ApiTags,ApiBearerAuth, ApiQuery, ApiResponse, ApiOperation,ApiParam } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { UrlDecode, Decrypt } from './utils'
import { ConfigService } from '@nestjs/config';

@Controller({
  path: 'user',
  version: '1'
})
@ApiTags('User Api')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
  ){}

  @Get('code')
  creatCode(@Req() req, @Res() res, @Session() session){
    const Captche = svgCaptche.create ({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 34,
      background: '#cc99966'
    })
    session.code = Captche.text;
    res.type('image/svg+xml')
    res.send(Captche.data)
    return {
      code: 200,
      data: Captche,
    }
  }
  @Post('appcenterToken')
  async getAppcenterToken(@Body() body, @Headers() headers) {
    const res = await this.userService.getAppcenterToken()
    console.log('getAppcenterToken',res);
    return res.data.Data
  }

  @Post('getMobileSsoToken')
  async gettoken(@Body() body, @Headers() headers) {
    const params = {
      userloginaccount: body.userloginaccount, 
      password: body.password, 
      appcode: body.appcode
    }
    const authorization = headers.authorization
    const res = await this.userService.getToken(params, authorization)
    console.log('getMobileSsoToken', res);
    return res.data.Data
  }
  // 解析token 获取 ticket|staffID|时间戳
  @Post('decodeToken')
  decodeToken(@Body() body) {
    const cryptoKey = this.configService.get<string>('cryptoKey')
    
    const hashCode = body.hashCode
    const decodedToken = UrlDecode(hashCode);

    const hashcodeInfo = Decrypt(decodedToken, cryptoKey);

    return hashcodeInfo
  }

  @Post('getUserByHashCode')
  async getUserByHashCode(@Body() body) {
    const params = {
      "ticket": body.ticket
    }
    const res = await this.userService.getUserInfo(params)
    return res.data.Data
  }

  @Post('getUserInfoByID')
  async getUserInfoByID() {
    const res = await this.userService.getUserInfoByID('0732')
    console.log('getUserInfoByID',res);
    
    return res
  }

  @Post()
  createUser(@Body() body, @Session() session) {
    console.log(body, session.code)
    if (body?.code.toLocaleLowerCase() === session.code.toLocaleLowerCase()) {
      return {
        code: 200,
        message: '验证码正确'
      }
    } else {
      return {
        code: 200,
        message: '验证码错误'
      }
    }
  }

  @Get()
  @ApiOperation({summary: 'user list 接口',description: '列表描述接口'})
  @ApiQuery({name: 'page', description: '分页信息'})
  findAll(@Query() query) {
    return {
      code: 200,
      message: query.name
    }
    // return this.userService.findAll();
  }

  @Get(':id')
  @ApiParam({name: 'id', description: '用户id', required:true,type:Number})
  findOne(@Param('id') id: string, @Headers() headers) {
    return {
      code: 200,
      message: this.userService.findOne(+id)
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
