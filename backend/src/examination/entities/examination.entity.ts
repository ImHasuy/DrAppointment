import {Column, CreateDateColumn, DeleteDateColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {AppointmentEntity} from "../../appointments/entities/appointment.entity";


export class ExaminationEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string

    @OneToMany(() => AppointmentEntity, (appointment) => appointment.examination)
    appointments: AppointmentEntity[];

    @Column()
    durationInMin: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;


}