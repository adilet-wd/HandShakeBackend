import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString, Length} from "class-validator";

enum UserRole {
    EMPLOYEE = 'EMPLOYEE',
    EMPLOYER = 'EMPLOYER',
    // Добавьте другие роли, если они есть
  }

export class CreateUserDTO {
    
    @ApiProperty({example: "Бексултан", description: "Имя. Не меньше 1 символа и не длинее 16"})
    @IsString({message: "Должно быть строкой"})
    @Length(1, 16, {message: "Не меньше 1 символа и не длинее 16"})
    readonly name: string;
    
    @ApiProperty({example: "Касымбеков", description: "Фамилия. Не меньше 1 символа и не длинее 16"})
    @IsString({message: "Должно быть строкой"})
    @Length(1, 16, {message: "Не меньше 1 символа и не длинее 16"})
    readonly username: string;

    @ApiProperty({example: "user@gmail.com", description: "Уникальный почтовый адрес"})
    @IsString({message: "Должно быть строкой"})
    @IsEmail({}, {message: "Некорректный email"})
    readonly email: string;

    @ApiProperty({example: "Pu0d1T9X", description: "Пароль. Не меньше 4 символов и не длинее 16"})
    @IsString({message: "Должно быть строкой"})
    @Length(4, 16, {message: "Не меньше 4 символов и не длинее 16"})
    readonly password: string;

    @ApiProperty({example: "EMPLOYEE", description: "Работник. Должно быть либо EMPLOYEE либо EMPLOYER"})
    @IsEnum(UserRole , {message: "Должно быть либо EMPLOYEE либо EMPLOYER"})
    readonly role: string;

}