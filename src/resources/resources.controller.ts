import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './DTOs/createResource.dto';
import { UpdateResourceDto } from './DTOs/updateResource.dto';
import { FilterResourceDto } from './DTOs/filterResource.dto';
import { JwtAuthGaurd } from '../auth/gaurds/jwt-AuthGaurds';
import { RolesGuard } from '../common/guards/roles/roles.guard';
import { Roles } from '../common/decorators/roles/roles.decorator';
import { Role } from '../common/Enums/role.enum';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiQuery, } from '@nestjs/swagger';
@ApiTags('Resources')
@ApiBearerAuth()
@Controller('resources')
@UseGuards(JwtAuthGaurd)
export class ResourcesController {
    constructor(private readonly resourceService: ResourcesService) { }
    @Post()
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Create a resource (Admin only)' })
    @ApiResponse({ status: 201, description: 'Resource created successfully' })
    @ApiResponse({ status: 403, description: 'Admin access required' })
    @ApiResponse({ status: 409, description: 'Resource already exists' })
    async craeteResource(@Body() data: CreateResourceDto) {
        return this.resourceService.createResource(data);
    }
    @Get()
    @ApiOperation({ summary: 'Get all resources' })
    @ApiResponse({ status: 200, description: 'Resources retrieved successfully' })
    async GetAllResources() {
        return this.resourceService.getAllResources()
    }
    @Get('available')
    @ApiOperation({ summary: 'Get all available resources' })
    @ApiResponse({ status: 200, description: 'Available resources retrieved successfully' })
    async availableResources() {
        return this.resourceService.AvilableResources();
    }

    @Get('filter')
    @ApiOperation({ summary: 'Filter resources by type and minimum capacity' })
    @ApiQuery({ name: 'type', required: false, example: 'MEETING ROOM' })
    @ApiQuery({ name: 'minCapacity', required: false, example: 5, type: Number })
    @ApiResponse({ status: 200, description: 'Filtered resources retrieved successfully' })
    async filterResources(@Query() data: FilterResourceDto) {
        return this.resourceService.filterResources(data);
    }
    @Get('search')
    @ApiOperation({ summary: 'Search resources by name or description' })
    @ApiQuery({ name: 'search', required: true, example: 'Meeting Room' })
    @ApiResponse({ status: 200, description: 'Matching resources retrieved successfully' })
    async searchResources(@Query('search') search: string) {
        return this.resourceService.searchResources(search);
    }
    @Get(':id')
    @ApiOperation({ summary: 'Get resource details by ID' })
    @ApiParam({ name: 'id', example: '6b06aeb291aae39f62a6f692' })
    @ApiResponse({ status: 200, description: 'Resource retrieved successfully' })
    @ApiResponse({ status: 404, description: 'Resource not found' })
    async GetResourceDeatils(@Param('id') id: string) {
        return this.resourceService.getResourceById(id);
    }
    @Patch(':id')
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Update a resource (Admin only)' })
    @ApiParam({ name: 'id', example: '6b06aeb291aae39f62a6f692' })
    @ApiResponse({ status: 200, description: 'Resource updated successfully' })
    @ApiResponse({ status: 403, description: 'Admin access required' })
    @ApiResponse({ status: 404, description: 'Resource not found' })
    async UpdateResources(@Param('id') id: string, @Body() data: UpdateResourceDto) {
        return this.resourceService.updateResource(id, data);
    }
    @Delete(':id')
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Delete a resource (Admin only)' })
    @ApiParam({ name: 'id', example: '6b06aeb291aae39f62a6f692' })
    @ApiResponse({ status: 200, description: 'Resource deleted successfully' })
    @ApiResponse({ status: 403, description: 'Admin access required' })
    @ApiResponse({ status: 404, description: 'Resource not found' })
    async DeleteResources(@Param('id') id: string) {
        return this.resourceService.deleteResource(id);
    }

}
