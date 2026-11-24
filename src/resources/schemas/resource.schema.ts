import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ResourceType } from "../../common/Enums/resource.enum";
import { OperatingHour, OperatingHourSchema } from './operating-hour.schema';
export type ResourceDocument = Resource & Document;
@Schema({ timestamps: true })
export class Resource {
    @Prop({ required: true, trim: true })
    name: string
    @Prop({ required: true, trim: true })
    description: string
    @Prop({ required: true, enum: ResourceType })
    type: ResourceType
    @Prop({ required: true, trim: true })
    location: string
    @Prop({
        required: true,
        min: 1,
        validate: {
            validator: (value: number) => Number.isInteger(value),
            message: 'Capacity must be a positive integer',
        },
    })
    capacity: number;
    @Prop({ default: true })
    isAvaliable: boolean
    @Prop({ type: [OperatingHourSchema], required: true })
    operatingHours: OperatingHour[];
}


export const ResourceSchema = SchemaFactory.createForClass(Resource)
ResourceSchema.index({ type: 1, isActive: 1 });
ResourceSchema.index({ location: 1 });