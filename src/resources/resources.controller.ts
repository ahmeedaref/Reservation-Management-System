import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './DTOs/createResource.dto';
import { UpdateResourceDto } from './DTOs/updateResource.dto';
import { FilterResourceDto } from './DTOs/filterResource.dto';
import { JwtAuthGaurd } from '../auth/gaurds/jwt-AuthGaurds';
import { RolesGuard } from '../common/guards/roles/roles.guard';
import { Roles } from '../common/decorators/roles/roles.decorator';
import { Role } from '../common/Enums/role.enum';


@Controller('resources')
@UseGuards(JwtAuthGaurd)
export class ResourcesController {
    constructor(private readonly resourceService: ResourcesService) { }
    @Post()
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    async craeteResource(@Body() data: CreateResourceDto) {
        return this.resourceService.createResource(data);
    }
    @Get()

    async GetAllResources() {
        return this.resourceService.getAllResources()
    }
    @Get('available')
    async availableResources() {
        return this.resourceService.AvilableResources();
    }

    @Get('filter')
    async filterResources(@Query() data: FilterResourceDto) {
        return this.resourceService.filterResources(data);
    }
    @Get('search')
    async searchResources(@Query('search') search: string) {
        return this.resourceService.searchResources(search);
    }
    @Get(':id')
    async GetResourceDeatils(@Param('id') id: string) {
        return this.resourceService.getResourceById(id);
    }
    @Patch(':id')
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    async UpdateResources(@Param('id') id: string, @Body() data: UpdateResourceDto) {
        return this.resourceService.updateResource(id, data);
    }
    @Delete(':id')
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    async DeleteResources(@Param('id') id: string) {
        return this.resourceService.deleteResource(id);
    }

}
