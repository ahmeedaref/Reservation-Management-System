import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Reservation, ReservationDocument } from "./schemas/reservation.schema";
import { ReservationStatus } from '../common/Enums/reservationStatus-enum';

@Injectable()
export class ReservationRepo {
    constructor(@InjectModel(Reservation.name)
    private readonly reservationModel: Model<ReservationDocument>) {

    }
    async create(data: Partial<Reservation>): Promise<ReservationDocument> {
        return this.reservationModel.create(data);
    }

    async findOverlap(
        resourceId: string,
        startTime: Date,
        endTime: Date,
        excludeReservationId?: string,
    ): Promise<ReservationDocument[]> {

        const filter: Record<string, any> = {
            resource: new Types.ObjectId(resourceId),
            status: ReservationStatus.CONFIRMED,
            startTime: { $lt: endTime },
            endTime: { $gt: startTime },
        };

        if (excludeReservationId) {
            filter._id = {
                $ne: new Types.ObjectId(excludeReservationId),
            };
        }

        return this.reservationModel.find(filter).exec();
    }

    async findById(id: string): Promise<ReservationDocument | null> {
        return this.reservationModel.findById(id).exec();
    }

    async findAll(): Promise<ReservationDocument[]> {
        return this.reservationModel.find().exec();
    }

    async findByCustomer(customerId: string): Promise<ReservationDocument[]> {
        const reservations = await this.reservationModel.find({
            customer: new Types.ObjectId(customerId),
        });
        return reservations;
    }

    async update(
        id: string,
        data: Partial<Reservation>,
    ): Promise<ReservationDocument | null> {

        const reservation = await this.reservationModel.findById(id).exec();

        if (!reservation) {
            return null;
        }

        reservation.set(data);

        return reservation.save();
    }

    async cancel(id: string): Promise<ReservationDocument | null> {
        return this.reservationModel.findByIdAndUpdate(
            id,
            { $set: { status: ReservationStatus.CANCELLED } },
            { returnDocument: 'after', runValidators: true },
        ).exec();
    }

    async filter(
        filters: {
            status?: ReservationStatus;
            startDate?: Date;
            endDate?: Date;
        },
    ): Promise<ReservationDocument[]> {
        const query: Record<string, any> = {};

        if (filters.status) {
            query.status = filters.status;
        }

        if (filters.startDate || filters.endDate) {
            query.startTime = {};

            if (filters.startDate) {
                query.startTime.$gte = filters.startDate;
            }

            if (filters.endDate) {
                query.startTime.$lte = filters.endDate;
            }
        }

        return this.reservationModel.find(query).exec();
    }
}