import { Controller, Get, Patch, Param, Request, UseGuards, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGaurd } from '../auth/gaurds/jwt-AuthGaurds';
import { Roles } from '../common/decorators/roles/roles.decorator';
import { Role } from '../common/Enums/role.enum';
import { updateUserDto } from './DTOs/updateUser.dto';
import { RolesGuard } from '../common/guards/roles/roles.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, } from '@nestjs/swagger';
@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGaurd)
export class UsersController {
    constructor(private readonly UserService: UsersService) { }
    @ApiOperation({ summary: 'Get the authenticated user profile' })
    @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Get('my-profile')
    async getProfile(@Request() req: any) {
        return this.UserService.GetProfile(req.user.userId);
    }
    @ApiOperation({ summary: 'Update the authenticated user profile' })
    @ApiResponse({ status: 200, description: 'Profile updated successfully' })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Patch('update-profile')
    async updateProfile(@Request() req: any, @Body() data: updateUserDto,) {
        return this.UserService.updateUser(req.user.userId, data);
    }
    @Get()
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Get all users (Admin only)' })
    @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
    async getAll() {
        return this.UserService.findAll()
    }
    @Get(':id')
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Get a user by ID (Admin only)' })
    @ApiParam({ name: 'id', example: '6b058069ed21e20a5e5e4481' })
    @ApiResponse({ status: 200, description: 'User retrieved successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
    findById(@Param('id') id: string) {
        return this.UserService.findUserById(id);
    }
    @Patch(':id/status')
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Activate or deactivate a user (Admin only)' })
    @ApiParam({ name: 'id', example: '6b058069ed21e20a5e5e4481' })
    @ApiResponse({ status: 200, description: 'User status updated successfully' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
    @ApiResponse({ status: 404, description: 'User not found' })
    updateUserStatus(@Param('id') id: string, @Body('isActive') isActive: boolean,) {
        return this.UserService.updateUserStatus(id, isActive);
    }
}
