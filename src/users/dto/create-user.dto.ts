import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
    @ApiProperty({example: "user@gmail.com", description: "Уникальный почтовый адрес"})
    readonly email: string;
    @ApiProperty({example: "Pu0d1T9X", description: "Пароль"})
    readonly password: string;
}