import { IsEmail, IsNotEmpty, IsString, MaxLength, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
    @IsEmail()
    @MaxLength(150)
    @ApiProperty({
        example: 'ahmed@example.com',
        description: 'Registered email address',
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(64)
    @ApiProperty({
        example: 'Password123!',
        description: 'Account password',
    })
    password: string;
}
