import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, Headers, Req, Res, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { request } from 'http';
import * as svgCaptche from 'svg-captcha'
import { sign } from 'crypto';
import { ApiTags,ApiBearerAuth, ApiQuery, ApiResponse, ApiOperation,ApiParam } from '@nestjs/swagger';
import { Observable } from 'rxjs';
@Controller({
  path: 'user',
  version: '1'
})
@ApiTags('User Api')
export class UserController {
  constructor(
    private readonly userService: UserService
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

  @Post('token')
  gettoken(@Body() body) {
    const res = this.userService.getToken()
    console.log('token res',res);
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
