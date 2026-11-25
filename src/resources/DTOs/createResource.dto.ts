import { IsString, IsInt, IsOptional, IsBoolean, Min, IsEnum } from "class-validator";
import { ResourceType } from "../../common/Enums/resource.enum";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateResourceDto {
    @IsString()
    @ApiProperty({
        example: 'Meeting Room A',
        description: 'Name of the resource',
    })
    name: string;

    @IsString()
    @ApiProperty({
        example: 'A meeting room with a projector and whiteboard',
        description: 'Description of the resource',
    })
    description: string;

    @IsInt()
    @Min(1)
    @ApiProperty({
        example: 10,
        description: 'Maximum number of people the resource can accommodate',
        minimum: 1,
    })
    capacity: number

    @IsEnum(ResourceType)
    @ApiProperty({
        enum: ResourceType,
        example: ResourceType.MEETING_ROOM,
        description: 'Type of resource',
    })
    type: ResourceType;
    
    @IsOptional()
    @IsBoolean()
    @ApiPropertyOptional({
        example: true,
        description: 'Whether the resource is available for booking',
        default: true,
    })
    isAvailable?: boolean;
}