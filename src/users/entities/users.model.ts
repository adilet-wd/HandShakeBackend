import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Employee } from "src/employee/entities/employees.model";
import { Employer } from "src/employer/entities/employers.model";
import { Role } from "src/role/entities/roles.model";
import { UserRoles } from "src/role/entities/user_roles.model";
import { Vacancy } from "src/vacancies/entities/vacancies.model";


@Table({
    tableName: 'users'
})
export class User extends Model<User> {

    @ApiProperty({example: "1", description: "Уникальный идентификатор, Primary Key"})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;
    
    @ApiProperty({example: "Adilet", description: "Имя"})
    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: false,
    })
    name: string;

    @ApiProperty({example: "Usenkanov", description: "Фамилия"})
    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: false,
    })
    username: string;

    @ApiProperty({example: "userMail@gmail.com", description: "Почтовый адрес"})
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @ApiProperty({example: "4spELm23", description: "Пароль"})
    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: false,
    })
    password: string;

    @ApiProperty({example: "false", description: "Забанен пользователь или нет"})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    banned: boolean;

    @ApiProperty({example: "Нарушение правила 1.1", description: "Причина блокировки"})
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    banReason: string;

    @BelongsToMany( ()=> Role, ()=> UserRoles)
    roles: Role[]

    @HasOne( ()=> Employee, { onDelete: 'CASCADE' })
    employee: Employee

    @HasOne( ()=> Employer, { onDelete: 'CASCADE' })
    employer: Employer


}