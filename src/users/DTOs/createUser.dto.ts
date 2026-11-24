import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, } from 'class-validator';
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsEmail()
    @MaxLength(150)
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(64)
    password: string;
}
