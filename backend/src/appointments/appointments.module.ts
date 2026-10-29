import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AppointmentEntity} from "./entities/appointment.entity";
import {AppointmentsRepository} from "./appointments.repository";

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService,AppointmentsRepository],
  exports:[AppointmentsService]
})
export class AppointmentsModule {}
