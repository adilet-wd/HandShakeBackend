import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginUserDto {
    @ApiProperty({example: "user@gmail.com", description: "Уникальный почтовый адрес"})
    @IsString({message: "Должно быть строкой"})
    readonly email: string;
    @ApiProperty({example: "Pu0d1T9X", description: "Пароль"})
    @IsString({message: "Должно быть строкой"})
    readonly password: string;
}