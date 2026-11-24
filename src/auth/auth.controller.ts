import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto/register.dto';
import { LoginDto } from './dto/login.dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('register')
    async registration(@Body() data: RegisterDto) {
        return this.authService.register(data);
    }
    @Post('login')
    async Logging(@Body() data: LoginDto) {
        return this.authService.login(data);
    }

}
