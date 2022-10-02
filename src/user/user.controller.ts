import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, Headers, Req, Res, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { request } from 'http';
import * as svgCaptche from 'svg-captcha'
import { sign } from 'crypto';

@Controller({
  path: 'user',
  version: '1'
})
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @Post('create')
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

  @Post()
  create(@Body() body: CreateUserDto) {
    console.log(body)
    return {
      code :200,
      message: body.name,
      age: body.age
    }
    // return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query) {
    console.log(query)
    return {
      code: 200,
      message: query.name
    }
    // return this.userService.findAll();

  }

  @Get(':id')
  findOne(@Param('id') id: string, @Headers() headers) {
    console.log(headers);
    console.log(id)
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
