import { Injectable } from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ExaminationEntity} from "./entities/examination.entity";
import {CreateExaminationDto} from "./dto/create-examination.dto";
import {UpdateExaminationDto} from "./dto/update-examination.dto";





@Injectable()
export class ExaminationRepository {
    constructor(
        @InjectRepository(ExaminationEntity)
        private readonly repository: Repository<ExaminationEntity>
    ) {}

    create(createExaminationDto: CreateExaminationDto) {
        return 'This action adds a new examination';
    }

    findAll() {
        return `This action returns all examination`;
    }

    findOne(id: number) {
        return `This action returns a #${id} examination`;
    }

    update(id: number, updateExaminationDto: UpdateExaminationDto) {
        return `This action updates a #${id} examination`;
    }

    remove(id: number) {
        return `This action removes a #${id} examination`;
    }

}

