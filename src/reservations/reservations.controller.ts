import { Controller, Post, Get, Param, Body, Patch, UseGuards, Query, Req, Put } from "@nestjs/common";
import { ReservationService } from './reservations.service';
import { Roles } from "../common/decorators/roles/roles.decorator";
import { RolesGuard } from "../common/guards/roles/roles.guard";
import { Role } from "../common/Enums/role.enum";
import { CreateReservationDto } from "./DTOs/createReservation.dto";
import { UpdateReservationDto } from "./DTOs/updateReservation.dto";
import { FilterReservationDto } from "./DTOs/filterReservation.dto";
import { JwtAuthGaurd } from "../auth/gaurds/jwt-AuthGaurds";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, } from '@nestjs/swagger';
@ApiTags('Reservations')
@ApiBearerAuth()
@Controller('reservations')
@UseGuards(JwtAuthGaurd)
export class ReservationsController {
    constructor(private readonly reservationService: ReservationService) { }
    @Post()
    @ApiOperation({ summary: 'Create a new reservation' })
    @ApiResponse({ status: 201, description: 'Reservation created successfully' })
    @ApiResponse({ status: 400, description: 'Invalid reservation data' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Resource not found' })
    @ApiResponse({ status: 409, description: 'Resource is not available for the requested time' })
    async create(@Req() req: any, @Body() data: CreateReservationDto) {
        return this.reservationService.createReservation(req.user.userId, data)
    }

    @Get()
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Get all reservations (Admin only)' })
    @ApiResponse({ status: 200, description: 'Reservations retrieved successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
    async getAllReservations() {
        return this.reservationService.getAllReservations();
    }

    @Get('my-reservations')
    @ApiOperation({ summary: 'Get the current customer reservations' })
    @ApiResponse({ status: 200, description: 'Customer reservations retrieved successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async getMyReservations(@Req() req: any) {
        return this.reservationService.getMyReservations(
            req.user.userId,
        );
    }

    @Get('filter')
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Filter reservations (Admin only)' })
    @ApiResponse({ status: 200, description: 'Reservations filtered successfully' })
    @ApiResponse({ status: 400, description: 'Invalid filter parameters' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
    async filterReservations(@Query() filters: FilterReservationDto) {
        return this.reservationService.filterReeservations(filters);
    }
    @Get(':id')
    @ApiOperation({ summary: 'Get reservation details' })
    @ApiParam({ name: 'id', description: 'Reservation ID', example: '674a12345678901234567890' })
    @ApiResponse({ status: 200, description: 'Reservation retrieved successfully' })
    @ApiResponse({ status: 403, description: 'Forbidden - You cannot access this reservation' })
    @ApiResponse({ status: 404, description: 'Reservation not found' })
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
    @ApiOperation({ summary: 'Update a reservation' })
    @ApiParam({ name: 'id', description: 'Reservation ID', example: '674a12345678901234567890' })
    @ApiResponse({ status: 200, description: 'Reservation updated successfully' })
    @ApiResponse({ status: 400, description: 'Invalid reservation data' })
    @ApiResponse({ status: 403, description: 'Forbidden - You cannot update this reservation' })
    @ApiResponse({ status: 404, description: 'Reservation or resource not found' })
    @ApiResponse({ status: 409, description: 'Resource is not available for the requested time' })
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
    @ApiOperation({ summary: 'Cancel a reservation' })
    @ApiParam({ name: 'id', description: 'Reservation ID', example: '674a12345678901234567890' })
    @ApiResponse({ status: 200, description: 'Reservation cancelled successfully' })
    @ApiResponse({ status: 403, description: 'Forbidden - You cannot cancel this reservation' })
    @ApiResponse({ status: 404, description: 'Reservation not found' })
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
