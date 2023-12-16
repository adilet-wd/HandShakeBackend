import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString, Length, Matches, MaxLength} from "class-validator";

enum UserRole {
    EMPLOYEE = 'EMPLOYEE',
    EMPLOYER = 'EMPLOYER',
    // Добавьте другие роли, если они есть
  }

export class CreateUserDTO {
    
    @ApiProperty({example: "Бексултан", description: "Имя. Не меньше 1 символа и не длинее 16. Имя должно быть на латинице."})
    @IsString({message: "Должно быть строкой"})
    @Matches(/^[^0-9]+$/, { message: 'В имени не должно быть цифр'})
    @Matches(/^[a-zA-Z]+$/, { message: 'Имя должно быть на латинице' })
    @Length(1, 16, {message: "Не меньше 1 символа и не длинее 16"})
    readonly name: string;
    
    @ApiProperty({example: "Касымбеков", description: "Фамилия. Не меньше 1 символа и не длинее 20. Фамилия должна быть на латинице."})
    @IsString({message: "Должно быть строкой"})
    @Matches(/^[^0-9]+$/, { message: 'В фамилии не должно быть цифр'})
    @Matches(/^[a-zA-Z]+$/, { message: 'Фамилия должна быть на латинице.' })
    @Length(1, 16, {message: "Не меньше 1 символа и не длинее 20"})
    readonly username: string;

    @ApiProperty({example: "user@gmail.com", description: "Уникальный почтовый адрес"})
    @IsString({message: "Должно быть строкой"})
    @IsEmail({}, {message: "Некорректный email"})
    readonly email: string;

    @ApiProperty({example: "Pu0d1T9X", description: "Пароль. Пароль должен содержать хотя бы 1 строчную букву, 1 заглавную букву, 1 цифры и быть не менее 8 символов длиной. Пароль должен быть не более 30 символов."})
    @IsString({message: "Должно быть строкой"})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message: 'Пароль должен содержать хотя бы 1 строчную букву, 1 заглавную букву, 1 цифры и быть не менее 8 символов длиной' })
    @MaxLength(30, { message: 'Пароль должен быть не более 30 символов.'})
    readonly password: string;

    @ApiProperty({example: "EMPLOYEE", description: "Работник. Должно быть либо EMPLOYEE либо EMPLOYER"})
    @IsEnum(UserRole , {message: "Должно быть либо EMPLOYEE либо EMPLOYER"})
    readonly role: string;

}