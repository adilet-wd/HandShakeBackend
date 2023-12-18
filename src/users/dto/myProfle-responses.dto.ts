import { ApiProperty } from "@nestjs/swagger";

export class MyProfileUnauthorizedResponse {
    @ApiProperty({example: "Недействительный access token", description: "Валидность токена"})
    readonly message: string;
}