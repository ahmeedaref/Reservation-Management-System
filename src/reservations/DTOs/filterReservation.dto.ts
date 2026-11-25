import { IsDateString, IsEnum, IsOptional, } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ReservationStatus } from '../../common/Enums/reservationStatus-enum';

export class FilterReservationDto {
    @ApiPropertyOptional({
        enum: ReservationStatus,
        example: ReservationStatus.CONFIRMED,
        description: 'Filter reservations by status',
    })
    @IsOptional()
    @IsEnum(ReservationStatus)
    status?: ReservationStatus;

    @ApiPropertyOptional({
        example: '2026-12-01T00:00:00.000Z',
        description: 'Filter reservations starting from this date',
    })
    @IsOptional()
    @IsDateString()
    startDate?: string;

    @ApiPropertyOptional({
        example: '2026-12-31T23:59:59.000Z',
        description: 'Filter reservations up to this date',
    })
    @IsOptional()
    @IsDateString()
    endDate?: string;
}
