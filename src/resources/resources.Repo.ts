import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Resource, ResourceDocument } from "./schemas/resource.schema";
import { CreateResourceDto } from "./DTOs/createResource.dto";
import { UpdateResourceDto } from "./DTOs/updateResource.dto";
import { FilterResourceDto } from "./DTOs/filterResource.dto";
@Injectable()
export class ResourceRepo {
    constructor(@InjectModel(Resource.name)
    private readonly resourceModel: Model<ResourceDocument>) { }

    async create(data: Partial<Resource>): Promise<ResourceDocument> {
        return this.resourceModel.create(data);
    }
    async findByName(name: string): Promise<ResourceDocument | null> {
        return this.resourceModel.findOne({ name });
    }

    async AllResources(): Promise<ResourceDocument[]> {
        return this.resourceModel.find();
    }

    async findResourceById(id: string): Promise<ResourceDocument | null> {
        return this.resourceModel.findById(id);
    }
    async findAvailableReource(): Promise<ResourceDocument[] | null> {
        return this.resourceModel.find({ isAvaliable: true });
    }

    async filterResources(
        data: Partial<Resource>
    ): Promise<ResourceDocument[]> {
        const filter: any = {};

        if (data.type) {
            filter.type = data.type;
        }

        if (data.capacity !== undefined) {
            filter.capacity = { $gte: data.capacity };
        }

        return this.resourceModel.find(filter);
    }

    async deleteResource(id: string): Promise<ResourceDocument | null> {
        return this.resourceModel.findByIdAndDelete(id);
    }
    async updateResource(id: string, data: Partial<Resource>): Promise<ResourceDocument | null> {
        return this.resourceModel.findByIdAndUpdate(id, { $set: data }, {
            returnDocument: 'after',
            runValidators: true,
        });
    }
    async searchResources(search: string): Promise<ResourceDocument[]> {
        return this.resourceModel.find({
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ],
        })
    }


}