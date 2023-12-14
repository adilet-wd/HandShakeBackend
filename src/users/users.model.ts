import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Role } from "src/role/roles.model";
import { UserRoles } from "src/role/user-roles.model";
import { Vacancy } from "src/vacancies/vacancies.model";


interface UserCreationAttrs {
    email: string;
    password: string;
    name: string;
    username: string;
}


@Table({
    tableName: 'users'
})
export class User extends Model<User, UserCreationAttrs> {

    @ApiProperty({example: "1", description: "Уникальный идентификатор, Primal Key"})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;
    
    @ApiProperty({example: "Бексултан", description: "Имя"})
    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: false,
    })
    name: string;

    @ApiProperty({example: "Касымбеков", description: "Фамилия"})
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

    @ApiProperty({example: "true", description: "Забанен пользователь или нет"})
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

    @HasMany( () => Vacancy)
    vacancies: Vacancy[]
}