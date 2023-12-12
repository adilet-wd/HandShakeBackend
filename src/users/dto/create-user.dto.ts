import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length} from "class-validator";


export class CreateUserDTO {
    
    @ApiProperty({example: "Бексултан", description: "Имя"})
    @IsString({message: "Должно быть строкой"})
    readonly name: string;

    @ApiProperty({example: "Касымбеков", description: "Фамилия"})
    @IsString({message: "Должно быть строкой"})
    readonly username: string;

    @ApiProperty({example: "user@gmail.com", description: "Уникальный почтовый адрес"})
    @IsString({message: "Должно быть строкой"})
    @IsEmail({}, {message: "Некорректный email"})
    readonly email: string;

    @ApiProperty({example: "Pu0d1T9X", description: "Пароль"})
    @IsString({message: "Должно быть строкой"})
    @Length(4, 16, {message: "Не меньше 4 символов и не длинее 16"})
    readonly password: string;

    @ApiProperty({example: "EMPLOYEE", description: "Работник"})
    @IsString({message: "Должно быть строкой"})
    readonly role: string;
}