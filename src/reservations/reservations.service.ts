import { Injectable, ConflictException, NotFoundException, BadRequestException, ForbiddenException } from "@nestjs/common";
import { ReservationRepo } from "./reservationRepo";
import { CreateReservationDto } from "./DTOs/createReservation.dto";
import { UpdateReservationDto } from "./DTOs/updateReservation.dto";
import { FilterReservationDto } from "./DTOs/filterReservation.dto";
import { ResourceRepo } from "../resources/resources.Repo";
import { Types } from "mongoose";
import { ReservationStatus } from '../common/Enums/reservationStatus-enum';
import { Role } from '../common/Enums/role.enum';

@Injectable()
export class ReservationService {
    constructor(private readonly reservationRepo: ReservationRepo,
        private readonly resourceRepo: ResourceRepo) {
    }
    private async checkAvailability(
        resourceId: string,
        startTime: Date,
        endTime: Date,
        attendees: number,
        excludeReservationId?: string,
    ) {
        const resource = await this.resourceRepo.findResourceById(resourceId);

        if (!resource) {
            throw new NotFoundException('Resource not found');
        }

        if (!resource.isAvailable) {
            throw new BadRequestException(
                'Resource is not available for reservation',
            );
        }

        if (attendees > resource.capacity) {
            throw new ConflictException(
                'Attendees is Greater than resource capacity',
            );
        }

        const overlappingReservations =
            await this.reservationRepo.findOverlap(
                resourceId,
                startTime,
                endTime,
                excludeReservationId,
            );

        if (overlappingReservations.length > 0) {
            throw new ConflictException(
                'Resource is already reserved during this time',
            );
        }

        return resource;
    }

    async createReservation(customerId: string, data: CreateReservationDto) {

        if (!Types.ObjectId.isValid(data.resource)) {
            throw new NotFoundException('inValid resource Id');
        }
        const startTime = new Date(data.startTime);
        const endTime = new Date(data.endTime);
        if (startTime <= new Date()) {
            throw new BadRequestException('start time must be in futuer')
        }
        if (endTime <= startTime) {
            throw new BadRequestException('end time must be after start time')
        }

        await this.checkAvailability(
            data.resource,
            startTime,
            endTime,
            data.attendees,
        );

        return this.reservationRepo.create({
            customer: new Types.ObjectId(customerId),
            resource: new Types.ObjectId(data.resource),
            startTime,
            endTime,
            attendees: data.attendees,
            status: ReservationStatus.CONFIRMED,
        });
    }

    async getAllReservations() {
        return this.reservationRepo.findAll();
    }

    async getMyReservations(customerId: string) {
        return this.reservationRepo.findByCustomer(customerId);
    }
    async getReservationById(
        reservationId: string,
        userId: string,
        role: Role,
    ) {
        const reservation = await this.reservationRepo.findById(reservationId);

        if (!reservation) {
            throw new NotFoundException('Reservation not found');
        }

        if (
            role !== Role.ADMIN &&
            reservation.customer.toString() !== userId
        ) {
            throw new ForbiddenException(
                'You are not allowed to access this reservation',
            );
        }

        return reservation;
    }

    async updateReservation(
        reservationId: string,
        userId: string,
        role: Role,
        data: UpdateReservationDto,
    ) {
        const reservation = await this.reservationRepo.findById(reservationId);

        if (!reservation) {
            throw new NotFoundException('Reservation not found');
        }

        if (role !== Role.ADMIN && reservation.customer.toString() !== userId) {
            throw new ForbiddenException(
                'You are not allowed to update this reservation',
            );
        }

        if (reservation.status !== ReservationStatus.CONFIRMED) {
            throw new BadRequestException(
                'Only confirmed reservations can be updated',
            );
        }

        let resourceId = reservation.resource.toString();
        let startTime = reservation.startTime;
        let endTime = reservation.endTime;
        let attendees = reservation.attendees;

        if (data.resource) {
            resourceId = data.resource;
        }

        if (data.startTime) {
            startTime = new Date(data.startTime);
        }

        if (data.endTime) {
            endTime = new Date(data.endTime);
        }

        if (data.attendees !== undefined) {
            attendees = data.attendees;
        }

        if (!Types.ObjectId.isValid(resourceId)) {
            throw new BadRequestException('invalid resource Id');
        }

        if (startTime <= new Date()) {
            throw new BadRequestException(
                'Reservation start time must be in the future',
            );
        }

        if (endTime <= startTime) {
            throw new BadRequestException(
                'End time must be after start time',
            );
        }

        await this.checkAvailability(
            resourceId,
            startTime,
            endTime,
            attendees,
            reservationId,
        );

        return this.reservationRepo.update(reservationId, {
            resource: new Types.ObjectId(resourceId),
            startTime,
            endTime,
            attendees,
        });
    }

    async cancelReservation(
        reservationId: string,
        userId: string,
        role: Role,
    ) {

        const reservation = await this.reservationRepo.findById(reservationId);

        if (!reservation) {
            throw new NotFoundException('Reservation not found');
        }

        if (
            role !== Role.ADMIN &&
            reservation.customer.toString() !== userId
        ) {
            throw new ForbiddenException(
                'You are not allowed to cancel this reservation',
            );
        }
        if (reservation.status !== ReservationStatus.CONFIRMED) {
            throw new BadRequestException(
                'Only confirmed reservations can be cancelled',
            );
        }
        return this.reservationRepo.cancel(reservationId);

    }
    async filterReeservations(filters: FilterReservationDto) {
        let startDate: Date | undefined
        let endDate: Date | undefined;

        if (filters.startDate) {
            startDate = new Date(filters.startDate);
        }

        if (filters.endDate) {
            endDate = new Date(filters.endDate);
        }

        if (startDate && endDate && startDate > endDate) {
            throw new BadRequestException(
                'Start date must be before end date',
            );
        }

        return this.reservationRepo.filter({
            status: filters.status,
            startDate: startDate,
            endDate: endDate,
        });
    }


}