import { ApiProperty } from "@nestjs/swagger";

export class UserDeleteDto {
    @ApiProperty({example: "user@gmail.com", description: "Почтовый адрес пользователя"})
    readonly email: string;
}