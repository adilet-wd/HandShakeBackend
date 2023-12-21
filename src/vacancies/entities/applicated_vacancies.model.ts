import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Vacancy } from "./vacancies.model";
import { Employee } from "src/employee/entities/employees.model";



@Table({
    tableName: 'applicated_vacancies',
    createdAt: false,
    updatedAt: false,
})
export class ApplicatedVacancy extends Model<ApplicatedVacancy> {

    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ForeignKey(()=> Vacancy)
    @Column({
        type: DataType.INTEGER,
    })
    vacancyId: number;

    @ForeignKey(()=> Employee)
    @Column({
        type: DataType.INTEGER,
    })
    employeeId: number;
}