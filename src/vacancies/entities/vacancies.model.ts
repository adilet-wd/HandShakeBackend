import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Employer } from "src/employer/entities/employers.model";
import { User } from "src/users/entities/users.model";

@Table({
    tableName: 'vacancies'
})
export class Vacancy extends Model<Vacancy> {

    @ApiProperty({example: "1", description: "Уникальный идентификатор, Primary Key"})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;
    
    @ApiProperty({example: "34", description: "Идентификатор работодателя, Foreign Key"})
    @ForeignKey(()=> Employer)
    @Column({
        type: DataType.INTEGER,
    })
    employerId: number;

    @ApiProperty({example: "Frontend разработчик", description: "Название вакансии"})
    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: false,
    })
    title: string;
    
    @ApiProperty({example: "В коллектив требуется фронтенд разработчик...", description: "Контетная часть вакансии"})
    @Column({
        type: DataType.TEXT,
        unique: false,
        allowNull: false,
    })
    content: string;

    @ApiProperty({example: "Консультировать менеджеров", description: "Обязанности"})
    @Column({
        type: DataType.TEXT,
        unique: false,
        allowNull: false,
    })
    duties: string;

    @ApiProperty({example: "Знание React", description: "Требования"})   
    @Column({
        type: DataType.TEXT,
        unique: false,
        allowNull: false,
    })
    requirements: string;

    @ApiProperty({example: "С 7 до 12", description: "Режим работы"})   
    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: false,
    })
    workMode: string;

    @BelongsTo(()=> Employer)
    employer: Employer
}