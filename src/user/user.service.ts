import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService
  ){}

  async getToken(params, authorization){
    // try {
    //   const response1: any = await lastValueFrom(
    //     this.httpService.post('https://cnshaappuwv751.asia.pwcinternal.com/AppCenterAPIs/app/gettoken', {
    //       AppCode:"tdhpro",
    //       AppSecret:"BMwNOUWFw4Kf0emvUwLp5kFrV82uAQgaVAXrzqFXjfxlCY94A9YY9od5URqwLG7C"
    //     })
    //   );
    //   return response1
    // }catch(err){
    //   console.log('err',err);
    // }

    try {
      const response: any = await lastValueFrom(
        this.httpService.post('https://mobileappsuat.pwchk.com/ApplicationCenter.RestService/api/applicationservice/GetUserAuthenticationWithAppCodeDeviceIDForMobileByPost',
          params
        ,{
          headers: {
            Authorization: authorization
          }
        })
      );
      return response
    }catch(err){
      console.log('err',err);
    }
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
