import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ResourceRepo } from './resources.Repo';
import { CreateResourceDto } from './DTOs/createResource.dto';
import { UpdateResourceDto } from './DTOs/updateResource.dto';
import { FilterResourceDto } from './DTOs/filterResource.dto';
@Injectable()
export class ResourcesService {
    constructor(private readonly resourceRepo: ResourceRepo) { }

    async createResource(data: CreateResourceDto) {
        try {
            const resource = await this.resourceRepo.findByName(data.name);
            if (resource) {
                throw new ConflictException('name of this Resource already taken ');
            }
            return this.resourceRepo.create(data);
        } catch (err) {
            throw new BadRequestException(err)
        }
    }
    async getAllResources() {
        try {
            return this.resourceRepo.AllResources();
        } catch (err) {
            throw new BadRequestException(err)
        }
    }
    async getResourceById(id: string) {
        try {
            const resource = await this.resourceRepo.findResourceById(id);
            if (!resource) {
                throw new NotFoundException('Resource not found');
            }
            return resource;
        } catch (err) {
            throw new BadRequestException(err)
        }
    }

    async updateResource(id: string, data: UpdateResourceDto) {
        try {
            const resource = await this.resourceRepo.findResourceById(id)
            if (!resource) {
                throw new NotFoundException('Resource not found')
            }
            return this.resourceRepo.updateResource(id, data);
        } catch (err) {
            throw new BadRequestException(err)
        }
    }

    async deleteResource(id: string) {
        try {
            const resource = await this.resourceRepo.findResourceById(id)
            if (!resource) {
                throw new NotFoundException('Resource not found')
            }
            await this.resourceRepo.deleteResource(id)

            return {
                message: 'Deleted Successfully'
            }
        } catch (err) {
            throw new BadRequestException(err)
        }
    }

    async AvilableResources() {
        try {
            return this.resourceRepo.findAvailableReource();
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    async filterResources(filters: FilterResourceDto) {
        try {
            return this.resourceRepo.filterResources(filters);
        } catch (err) {
            throw new BadRequestException(err)
        }
    }

    async searchResources(search: string) {
        try {
            return this.resourceRepo.searchResources(search);
        } catch (err) {
            throw new BadRequestException(err)
        }
    }
}

