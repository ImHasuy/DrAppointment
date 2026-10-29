import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
//import {HasRoles, JwtAuthGuard, Role, RolesGuard} from "../auth";
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";

@Controller({
  version: '1',
  path: 'patient'
})
//@HasRoles(Role.ADMIN)
//@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('patient')
//@ApiBearerAuth()
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @ApiOkResponse({ type: String, isArray: true })
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }
}
