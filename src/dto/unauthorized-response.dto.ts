import { ApiProperty } from "@nestjs/swagger";

export class UnauthorizedResponse {
    @ApiProperty({example: "Пользователь не авторизован", description: "Авторизован ли пользователь"})
    readonly message: string;
}