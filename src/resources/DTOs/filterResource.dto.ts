import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { ResourceType } from '../../common/Enums/resource.enum';
import { Type } from 'class-transformer';

export class FilterResourceDto {
    @IsOptional()
    @IsEnum(ResourceType)
    type?: ResourceType;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    minCapacity?: number;
}