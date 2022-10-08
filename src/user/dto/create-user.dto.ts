import { ApiProperty } from '@nestjs/swagger'
export class CreateUserDto {
    @ApiProperty({example: 'tiger'})
    name: string
    @ApiProperty({example: '18'})
    age: number
    @ApiProperty({example: '1234'})
    code: any
}
