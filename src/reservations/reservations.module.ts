import { Module, Controller } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './schemas/reservation.schema';
import { ReservationRepo } from './reservationRepo';
import { ReservationService } from './reservations.service';
import { ResourcesModule } from '../resources/resources.module';
import { ReservationsController } from './reservations.controller';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }]),
        ResourcesModule
    ],
    controllers: [ReservationsController],
    providers: [ReservationRepo, ReservationService],
    exports: [ReservationService, ReservationRepo],
})
export class ReservationsModule { }
