import { Injectable, ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserRepo } from '../users/UserRepo';
import { CreateUserDto } from '../users/DTOs/createUser.dto'
import { Role } from '../common/Enums/role.enum';
import * as bycrpt from 'bcrypt'
import { LoginDto } from './dto/login.dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor(
        private readonly UserRepo: UserRepo,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    async register(data: CreateUserDto) {
        const UserExist = await this.UserRepo.findByEmail(data.email);
        if (UserExist) {
            throw new ConflictException('Email is already exist')
        }
        const hashPassword = await bycrpt.hash(data.password, 10)
        const User = await this.UserRepo.create({ name: data.name, email: data.email, password: hashPassword, role: Role.CUSTOMER })
        return {
            message: 'Regiteration Done Successfully ',
            User
        }
    }

    async login(data: LoginDto) {
        try {
            const userExist = await this.UserRepo.findByEmail(data.email)
            if (!userExist) {
                throw new UnauthorizedException('Invalid email')
            }
            if (!userExist.isActive) {
                throw new UnauthorizedException('Your account is not active ')
            }
            const comparedPassword = await bycrpt.compare(data.password, userExist.password,)
            if (!comparedPassword) {
                throw new UnauthorizedException('Wrong Password ')
            }
            const payload = {
                sub: userExist._id.toString(),
                email: userExist.email,
                role: userExist.role,
            }
            const accessToken = await this.jwtService.signAsync(
                payload
            );
            const refreshtoken = await this.jwtService.signAsync(
                payload, {
                secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
                expiresIn: '7d',
            }
            )

            return { message: 'Logged Successfuly', accessToken, refreshtoken };
        } catch (err) {
            throw new BadRequestException(err)
        }

    }
}
