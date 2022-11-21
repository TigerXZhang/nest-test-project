import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ){}
  
  async getAppcenterToken(){
    // https://cnshaappuwv751.asia.pwcinternal.com/AppCenterAPIs/app/gettoken
    const appCenterAPI = this.configService.get<string>('appCenterAPI')
    console.log(appCenterAPI);
    try {
      const response1: any = await lastValueFrom(
        this.httpService.post(appCenterAPI + '/app/gettoken', {
          AppCode:"tdhpro",
          AppSecret:"BMwNOUWFw4Kf0emvUwLp5kFrV82uAQgaVAXrzqFXjfxlCY94A9YY9od5URqwLG7C"
        })
      );
      return response1
    }catch(err){
      console.log('err',err);
    }
  }

  async getToken(params, authorization){
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

  async getUserInfo(params){
    try {
      const response: any = await lastValueFrom(
        this.httpService.post('https://mobileappsuat.pwchk.com/MobileOpenAPI/api/StaffInfo/LoginByHashCode',
          params
        )
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
