import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Sex} from "../enum/sex.enum";
import {AppointmentEntity} from "../../appointments/entities/appointment.entity";

@Entity()
export class PatientEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: Sex
        }
    )
    sex: Sex;

    @OneToMany(() => AppointmentEntity, (appointment) => appointment.patient)
    appointments: AppointmentEntity[];

    @Column()
    ssn: number;

    @Column()
    birthYear: number
}