import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PatientEntity} from "./entities/patient.entity";
import {CreatePatientDto} from "./dto/create-patient.dto";
import {UpdatePatientDto} from "./dto/update-patient.dto";


@Injectable()
export class PatientRepository {
    constructor(
        @InjectRepository(PatientEntity)
        private readonly repository: Repository<PatientEntity>,
    ) {}

    create(createPatientDto: CreatePatientDto) {
        return 'This action adds a new patient';
    }

    findAll() {
        return `This action returns all patient`;
    }

    findOne(id: number) {
        return `This action returns a #${id} patient`;
    }

    update(id: number, updatePatientDto: UpdatePatientDto) {
        return `This action updates a #${id} patient`;
    }

    remove(id: number) {
        return `This action removes a #${id} patient`;
    }

}