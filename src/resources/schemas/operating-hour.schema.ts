
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { WeekDay } from '../../common/Enums/week-day.enum';

@Schema({ _id: false })
export class OperatingHour {
    @Prop({ required: true, enum: WeekDay })
    day: WeekDay;

    @Prop({
        required: function (this: OperatingHour) {
            return !this.isClosed;
        },
        match: /^([01]\d|2[0-3]):[0-5]\d$/,
    })
    openTime?: string;

    @Prop({
        required: function (this: OperatingHour) {
            return !this.isClosed;
        },
        match: /^([01]\d|2[0-3]):[0-5]\d$/,
    })
    closeTime?: string;

    @Prop({ default: false })
    isClosed: boolean;
}

export const OperatingHourSchema =
    SchemaFactory.createForClass(OperatingHour);
