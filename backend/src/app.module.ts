import { Module } from '@nestjs/common';
import { AppointmentsModule } from './appointments/appointments.module';
import { ExaminationModule } from './examination/examination.module';
import { PatientModule } from './patient/patient.module';


@Module({
  imports: [AppointmentsModule, ExaminationModule, PatientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
