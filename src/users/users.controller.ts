import { Controller, Get, Patch, Param, Request, UseGuards, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGaurd } from '../auth/gaurds/jwt-AuthGaurds';
import { Roles } from '../common/decorators/roles/roles.decorator';
import { Role } from '../common/Enums/role.enum';
import { updateUserDto } from './DTOs/updateUser.dto';
import { RolesGuard } from '../common/guards/roles/roles.guard';
@Controller('users')
@UseGuards(JwtAuthGaurd)
export class UsersController {
    constructor(private readonly UserService: UsersService) { }
    @Get('my-profile')
    async getProfile(@Request() req: any) {
        return this.UserService.GetProfile(req.user.userId);
    }
    @Patch('update-profile')
    async updateProfile(@Request() req: any, @Body() data: updateUserDto,) {
        return this.UserService.updateUser(req.user.userId, data);
    }
    @Get()
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    async getAll() {
        return this.UserService.findAll()
    }
    @Get(':id')
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    findById(@Param('id') id: string) {
        return this.UserService.findUserById(id);
    }
    @Patch(':id/status')
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    updateUserStatus(@Param('id') id: string, @Body('isActive') isActive: boolean,) {
        return this.UserService.updateUserStatus(id, isActive);
    }
}
