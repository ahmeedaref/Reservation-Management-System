import { IsString, IsInt, IsOptional, IsBoolean, Min, IsEnum } from "class-validator";
import { ResourceType } from "../../common/Enums/resource.enum";
export class CreateResourceDto {
    @IsString()
    name: string;
    @IsString()
    description: string;
    @IsInt()
    @Min(1)
    capacity: number
    @IsEnum(ResourceType)
    type: ResourceType;
    @IsOptional()
    @IsBoolean()
    isAvailable?: boolean;
}