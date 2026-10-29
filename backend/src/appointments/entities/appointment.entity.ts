import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, ManyToOne,
    PrimaryGeneratedColumn,
    RelationId,
    UpdateDateColumn
} from "typeorm";
import {ExaminationEntity} from "../../examination/entities/examination.entity";
import {PatientEntity} from "../../patient/entities/patient.entity";

@Entity()
export class AppointmentEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    date:Date;

    @ManyToOne(() => ExaminationEntity, (examination: ExaminationEntity) => examination.appointments)
    examination: ExaminationEntity;

    @RelationId((appointment:AppointmentEntity) => appointment.examination)
    examinationId:string;

    @ManyToOne(()=> PatientEntity, (patient:PatientEntity)=> patient.appointments)
    patient: PatientEntity;

    @RelationId((appointment : AppointmentEntity) => appointment.patient)
    patientId:string;

    @Column({nullable: true})
    comment: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;


}