import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
    @ApiProperty({example: "user@gmail.com", description: "Почтовый адрес пользователя"})
    @IsNotEmpty({ message: 'Почтовый адрес не должен быть пустым' })
    @IsString({message: "Должно быть строкой"})
    readonly email: string;
    @ApiProperty({example: "Pu0d1T9X", description: "Пароль пользователя"})
    @IsNotEmpty({ message: 'Пароль не должен быть пустым' })
    @IsString({message: "Должно быть строкой"})
    readonly password: string;
}