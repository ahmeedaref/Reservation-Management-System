import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ResourceRepo } from './resources.Repo';
import { CreateResourceDto } from './DTOs/createResource.dto';
import { UpdateResourceDto } from './DTOs/updateResource.dto';
import { FilterResourceDto } from './DTOs/filterResource.dto';
@Injectable()
export class ResourcesService {
    constructor(private readonly resourceRepo: ResourceRepo) { }

    async createResource(data: CreateResourceDto) {
        const resource = await this.resourceRepo.findByName(data.name);
        if (resource) {
            throw new ConflictException('name of this Resource already taken ');
        }
        return this.resourceRepo.create(data);
    }
    async getAllResources() {
        return this.resourceRepo.AllResources();
    }
    async getResourceById(id: string) {
        const resource = await this.resourceRepo.findResourceById(id);
        if (!resource) {
            throw new NotFoundException('Resource not found');
        }
        return resource;

    }

    async updateResource(id: string, data: UpdateResourceDto) {
        const resource = await this.resourceRepo.findResourceById(id)
        if (!resource) {
            throw new NotFoundException('Resource not found')
        }
        return this.resourceRepo.updateResource(id, data);

    }

    async deleteResource(id: string) {
        const resource = await this.resourceRepo.findResourceById(id)
        if (!resource) {
            throw new NotFoundException('Resource not found')
        }
        await this.resourceRepo.deleteResource(id)

        return {
            message: 'Deleted Successfully'
        }

    }

    async AvilableResources() {
        return this.resourceRepo.findAvailableReource();

    }

    async filterResources(filters: FilterResourceDto) {
        return this.resourceRepo.filterResources(filters);
    }

    async searchResources(search: string) {

        return this.resourceRepo.searchResources(search);
    }
}


