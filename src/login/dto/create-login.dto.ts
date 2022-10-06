import {IsString, IsEmpty, Length, IsNumber} from 'class-validator'

export class CreateLoginDto {
    @IsString()
    @IsEmpty()
    @Length(3, 10, {
        message: '长度在3-10个字符之间'
    })
    name: string;
    @IsNumber()
    age: number
}
