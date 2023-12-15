import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class GetUserDto {

    @ApiProperty({example: "user@gmail.com", description: "Почтовый адрес пользователя"})
    @IsString({message: "Должно быть строкой"})
    @IsEmail()
    readonly email: string;

}