import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { ResourceType } from '../../common/Enums/resource.enum';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class FilterResourceDto {
    @IsOptional()
    @IsEnum(ResourceType)
    @ApiPropertyOptional({
        enum: ResourceType,
        example: ResourceType.MEETING_ROOM,
        description: 'Filter resources by type',
    })
    type?: ResourceType;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @ApiPropertyOptional({
        example: 5,
        description: 'Return resources with capacity greater than or equal to this value',
        minimum: 1,
        type: Number,
    })
    minCapacity?: number;
}