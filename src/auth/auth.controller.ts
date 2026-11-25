import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto/login.dto';
import { CreateUserDto } from '../users/DTOs/createUser.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @ApiOperation({ summary: 'Register a new customer' })
    @ApiResponse({ status: 201, description: 'User registered successfully' })
    @ApiResponse({ status: 409, description: 'Email already exists' })
    @Post('register')
    async registration(@Body() data: CreateUserDto) {
        return this.authService.register(data);
    }
    @ApiOperation({ summary: 'Login and receive JWT tokens' })
    @ApiResponse({ status: 200, description: 'Login successful' })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    @Post('login')
    async Logging(@Body() data: LoginDto) {
        return this.authService.login(data);
    }

}
