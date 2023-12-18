import { ApiProperty } from "@nestjs/swagger";
import { DateOnlyDataType } from "sequelize";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "src/users/entities/users.model";
import { EnumType } from "typescript";

@Table({
    tableName: 'employers',
    createdAt: false,
    updatedAt: false,
})
export class Employer extends Model<Employer> {
    
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
    companyName: string;

    @ApiProperty({example: "Г.Бишкек ул. Анкара", description: "Место расположение офиса компании"})
    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: true,
    })
    location: string;
    
    @ApiProperty({example: "Компания MBank - банковская сфера", description: "Описание компании"})
    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: true,
    })
    companyDescription: string;

    @BelongsTo(()=> User)
    user: User
}