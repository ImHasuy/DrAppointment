import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentsRepository } from './appointments.repository';
import { AppointmentEntity } from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(private readonly appointmentRepository: AppointmentsRepository) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<AppointmentEntity> {
    return await this.appointmentRepository.create(createAppointmentDto);
  }

  async findAll(): Promise<AppointmentEntity[]> {
    return await this.appointmentRepository.findAll();
  }

  async findOne(id: string): Promise<AppointmentEntity> {
    const appointment = await this.appointmentRepository.findOne(id);
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID '${id}' not found`);
    }
    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<AppointmentEntity> {
    await this.findOne(id);
    const updated = await this.appointmentRepository.update(id, updateAppointmentDto);
    if (!updated) {
      throw new NotFoundException(`Appointment with ID '${id}' not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<AppointmentEntity> {
    await this.findOne(id);
    const removed = await this.appointmentRepository.remove(id);
    if (!removed) {
      throw new NotFoundException(`Appointment with ID '${id}' not found`);
    }
    return removed;
  }
}

