import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto/login.dto';
import { CreateUserDto } from '../users/DTOs/createUser.dto';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('register')
    async registration(@Body() data: CreateUserDto) {
        return this.authService.register(data);
    }
    @Post('login')
    async Logging(@Body() data: LoginDto) {
        return this.authService.login(data);
    }

}
