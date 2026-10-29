import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentEntity } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsRepository {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly repository: Repository<AppointmentEntity>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<AppointmentEntity> {
    const data: any = { ...createAppointmentDto };
    if (data.examinationId && !data.examination) {
      data.examination = { id: data.examinationId };
    }
    if (data.patientId && !data.patient) {
      data.patient = { id: data.patientId };
    }
    const appointment = this.repository.create(data as AppointmentEntity);
    const saved = await this.repository.save(appointment);
    return (await this.findOne(saved.id)) ?? saved;
  }

  async findAll(): Promise<AppointmentEntity[]> {
    return await this.repository.find({
      relations: {
        examination: true,
        patient: true,
      },
    });
  }

  async findOne(id: string): Promise<AppointmentEntity | null> {
    return await this.repository.findOne({
      where: { id },
      relations: {
        examination: true,
        patient: true,
      },
    });
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<AppointmentEntity | null> {
    const appointment = await this.repository.findOne({ where: { id } });
    if (!appointment) {
      return null;
    }

    const data: any = { ...updateAppointmentDto };
    if (data.examinationId !== undefined) {
      data.examination = data.examinationId ? { id: data.examinationId } : null;
    }
    if (data.patientId !== undefined) {
      data.patient = data.patientId ? { id: data.patientId } : null;
    }

    this.repository.merge(appointment, data);
    await this.repository.save(appointment);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<AppointmentEntity | null> {
    const appointment = await this.repository.findOne({ where: { id } });
    if (!appointment) {
      return null;
    }
    return await this.repository.softRemove(appointment);
  }
}

