import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Resource, ResourceSchema } from './schemas/resource.schema';
import { ResourceRepo } from './resources.Repo';
import { ResourcesService } from './resources.service';
import { ResourcesController } from './resources.controller';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: Resource.name, schema: ResourceSchema }])
    ],
    exports: [ResourceRepo, ResourcesService],
    providers: [ResourceRepo, ResourcesService],
    controllers: [ResourcesController]
})
export class ResourcesModule { }
