import { ApiProperty } from "@nestjs/swagger";
import { DateOnlyDataType } from "sequelize";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "src/users/entities/users.model";
import { ApplicatedVacancy } from "src/vacancies/entities/applicated_vacancies.model";
import { EnumType } from "typescript";

@Table({
    tableName: 'employees',
    createdAt: false,
    updatedAt: false,
})


export class Employee extends Model<Employee> {
    
    @ApiProperty({example: "1", description: "Уникальный идентификатор, Primal Key"})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;
    
    @ApiProperty({example: "12", description: "ForeignKey пользователя"})
    @ForeignKey(()=> User)
    @Column({
        type: DataType.INTEGER,
    })
    userId: number;

    @ApiProperty({example: "Ala-Too university", description: "Место обучения"})
    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: true,    
    })
    studyLocation: string;

    @ApiProperty({example: "YYYY-MM-DD", description: "Дата рождения"})
    @Column({
        type: DataType.DATEONLY,
        unique: false,
        allowNull: true,
    })
    dateOfBirth: Date;
    
    @ApiProperty({example: "MALE", description: "Пол"})
    @Column({
        type: DataType.ENUM('MALE', 'FEMALE'),
        unique: false,
        allowNull: true,
    })
    gender: EnumType;

    @BelongsTo(()=> User)
    user: User

    @HasMany(() => ApplicatedVacancy, { onDelete: 'CASCADE' })
    applicatedVacancies: ApplicatedVacancy[];
}