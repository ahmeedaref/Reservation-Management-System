import { IsDateString, IsMongoId, IsInt, Min, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
    @IsMongoId()
    @ApiProperty({
        example: '674a12345678901234567890',
        description: 'ID of the resource to reserve',
    })
    resource: string;

    @IsDateString()

    @ApiProperty({
        example: '2026-12-01T10:00:00.000Z',
        description: 'Reservation start date and time in ISO 8601 format',
    })
    startTime: string;

    @IsDateString()
    @ApiProperty({
        example: '2026-12-01T12:00:00.000Z',
        description: 'Reservation end date and time in ISO 8601 format',
    })
    endTime: string;
    @IsInt()
    @Min(1)
    @ApiProperty({
        example: 5,
        description: 'Number of attendees',
        minimum: 1,
    })
    attendees: number;
}