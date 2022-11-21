import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
    @InjectRepository(Users,'appcenter') private users: Repository<Users>,
  ){}
  
  async getAppcenterToken(){
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
  // 获取手机端sso token 数据
  async getToken(params, authorization){
    try {
      const mobileBaseUrl = this.configService.get<string>('mobileBaseUrl')
      const response: any = await lastValueFrom(
        this.httpService.post(mobileBaseUrl + '/api/applicationservice/GetUserAuthenticationWithAppCodeDeviceIDForMobileByPost',
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
  // 调caiyu 接口解析token
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
  async getUserInfoByID(id) {
    console.log(id);
    
    return this.users.findBy({"StaffID": id})
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
