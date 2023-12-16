import { ApiProperty } from "@nestjs/swagger";

export class MyProfileUnauthorizedResponse {
    @ApiProperty({example: "Неправильный access token", description: "Валидность токена"})
    readonly message: string;
}