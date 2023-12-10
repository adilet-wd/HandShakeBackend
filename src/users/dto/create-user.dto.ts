import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
    @ApiProperty({example: "Бексултан", description: "Имя"})
    readonly name: string;
    @ApiProperty({example: "Касымбеков", description: "Фамилия"})
    readonly username: string;
    @ApiProperty({example: "user@gmail.com", description: "Уникальный почтовый адрес"})
    readonly email: string;
    @ApiProperty({example: "Pu0d1T9X", description: "Пароль"})
    readonly password: string;
    @ApiProperty({example: "EMPLOYEE", description: "Работник"})
    readonly role: string;
}