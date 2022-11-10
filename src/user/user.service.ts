import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpService } from '@nestjs/axios'

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService
  ){}

  getToken(){
    this.httpService.post('https://cnshaappuwv751.asia.pwcinternal.com/AppCenterAPIs/app/gettoken', {
      "AppCode":"tdhpro",
      "AppSecret":"BMwNOUWFw4Kf0emvUwLp5kFrV82uAQgaVAXrzqFXjfxlCY94A9YY9od5URqwLG7C"
    },{
      headers:{
        'Content-Type': 'application/json;charset=utf-8'
      },
    })
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
