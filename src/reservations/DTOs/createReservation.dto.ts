import { IsDateString, IsMongoId, IsInt, Min, } from 'class-validator';
export class CreateReservationDto {
    @IsMongoId()
    resource: string;
    @IsDateString()
    startTime: string;
    @IsDateString()
    endTime: string;
    @IsInt()
    @Min(1)
    attendees: number;
}