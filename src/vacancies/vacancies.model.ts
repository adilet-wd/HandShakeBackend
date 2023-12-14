import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";


interface VacancyCreationAttrs {
    title: string;
    content: string;
    workMode: string;
    userId: number,
}


@Table({
    tableName: 'vacancies'
})
export class Vacancy extends Model<Vacancy, VacancyCreationAttrs> {

    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: false,
    })
    content: string;

    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: false,
    })
    workMode: string;

    @ForeignKey(()=> User)
    @Column({
        type: DataType.INTEGER,
    })
    userId: number;

    @BelongsTo( ()=> User ) 
    author: User 
}