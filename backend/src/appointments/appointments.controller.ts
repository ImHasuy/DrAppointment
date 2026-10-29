import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentEntity } from './entities/appointment.entity';

@ApiTags('appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new appointment' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The appointment has been successfully created.',
    type: AppointmentEntity,
  })
  async create(@Body() createAppointmentDto: CreateAppointmentDto): Promise<AppointmentEntity> {
    return await this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all appointments' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all appointments.',
    type: [AppointmentEntity],
  })
  async findAll(): Promise<AppointmentEntity[]> {
    return await this.appointmentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an appointment by ID' })
  @ApiParam({ name: 'id', description: 'Appointment UUID', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The appointment has been found.',
    type: AppointmentEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Appointment not found.',
  })
  async findOne(@Param('id') id: string): Promise<AppointmentEntity> {
    return await this.appointmentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an appointment by ID' })
  @ApiParam({ name: 'id', description: 'Appointment UUID', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The appointment has been successfully updated.',
    type: AppointmentEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Appointment not found.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<AppointmentEntity> {
    return await this.appointmentsService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an appointment by ID' })
  @ApiParam({ name: 'id', description: 'Appointment UUID', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The appointment has been successfully deleted.',
    type: AppointmentEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Appointment not found.',
  })
  async remove(@Param('id') id: string): Promise<AppointmentEntity> {
    return await this.appointmentsService.remove(id);
  }
}

