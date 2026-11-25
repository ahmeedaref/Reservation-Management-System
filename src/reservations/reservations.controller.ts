import { Controller, Post, Get, Param, Body, Patch, UseGuards, Query, Req, Put } from "@nestjs/common";
import { ReservationService } from './reservations.service';
import { Roles } from "../common/decorators/roles/roles.decorator";
import { RolesGuard } from "../common/guards/roles/roles.guard";
import { Role } from "../common/Enums/role.enum";
import { CreateReservationDto } from "./DTOs/createReservation.dto";
import { UpdateReservationDto } from "./DTOs/updateReservation.dto";
import { FilterReservationDto } from "./DTOs/filterReservation.dto";
import { JwtAuthGaurd } from "../auth/gaurds/jwt-AuthGaurds";

@Controller('reservations')
@UseGuards(JwtAuthGaurd)
export class ReservationsController {
    constructor(private readonly reservationService: ReservationService) { }
    @Post()
    async create(@Req() req: any, @Body() data: CreateReservationDto) {
        return this.reservationService.createReservation(req.user.userId, data)
    }

    @Get()
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    async getAllReservations() {
        return this.reservationService.getAllReservations();
    }

    @Get('my-reservations')
    async getMyReservations(@Req() req: any) {
        return this.reservationService.getMyReservations(
            req.user.userId,
        );
    }

    @Get('filter')
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    async filterReservations(@Query() filters: FilterReservationDto) {
        return this.reservationService.filterReeservations(filters);
    }
    @Get(':id')
    async getReservationById(
        @Param('id') id: string,
        @Req() req: any,
    ) {
        return this.reservationService.getReservationById(
            id,
            req.user.userId,
            req.user.role,
        );

    }
    @Patch(':id')
    async updateReservation(
        @Param('id') id: string,
        @Req() req: any,
        @Body() data: UpdateReservationDto,
    ) {
        return this.reservationService.updateReservation(
            id,
            req.user.userId,
            req.user.role,
            data,
        );
    }
    @Put(':id/cancel')
    async cancelReservation(
        @Param('id') id: string,
        @Req() req: any,
    ) {
        return this.reservationService.cancelReservation(
            id,
            req.user.userId,
            req.user.role,
        );
    }


}
