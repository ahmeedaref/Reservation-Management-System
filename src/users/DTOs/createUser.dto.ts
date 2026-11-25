import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @ApiProperty({
        example: 'Ahmed Mohamed',
        description: 'Full name of the customer',
    })
    name: string;

    @IsEmail()
    @MaxLength(150)
    @ApiProperty({
        example: 'ahmed@example.com',
        description: 'Unique email address',
    })
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(64)
    @ApiProperty({
        example: 'Password123!',
        description: 'Password (minimum 8 characters)',
        minLength: 8,
        maxLength: 64,
    })
    password: string;
}
