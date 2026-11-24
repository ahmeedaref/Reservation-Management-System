import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ReservationStatus } from '../../common/Enums/reservationStatus-enum';
import { User } from '../../users/schemas/user.schema';
import { Resource } from '../../resources/schemas/resource.schema';

export type ReservationDocument = Reservation & Document;
@Schema({ timestamps: true })
export class Reservation {
    @Prop({
        type: Types.ObjectId,
        ref: User.name,
        required: true,
    })
    customer: Types.ObjectId;
    @Prop({
        type: Types.ObjectId,
        ref: Resource.name,
        required: true,
    })
    resource: Types.ObjectId;
    @Prop({ required: true })
    startTime: Date;

    @Prop({
        required: true,
        validate: {
            validator: function (this: Reservation, value: Date) {
                return value > this.startTime;
            },
            message: 'End time must be after start time',
        },
    })
    endTime: Date;
    @Prop({
        required: true,
        min: 1,
        validate: {
            validator: (value: number) => Number.isInteger(value),
            message: 'Attendees must be a positive integer',
        },
    })
    attendees: number;
    @Prop({
        required: true,
        enum: ReservationStatus,
        default: ReservationStatus.CONFIRMED,
    })
    status: ReservationStatus;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
ReservationSchema.index({ resource: 1, startTime: 1, endTime: 1 });
ReservationSchema.index({ customer: 1, createdAt: -1 });
ReservationSchema.index({ status: 1, startTime: 1 });
