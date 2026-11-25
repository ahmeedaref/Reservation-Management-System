import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { ReservationStatus } from '../../common/Enums/reservationStatus-enum';
export class FilterReservationDto {
    @IsOptional()
    @IsEnum(ReservationStatus)
    status?: ReservationStatus;

    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;
}