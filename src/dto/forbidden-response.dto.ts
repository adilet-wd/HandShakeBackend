import { ApiProperty } from "@nestjs/swagger";

export class ForbiddenResponse {
    @ApiProperty({example: "Нет доступа", description: "Есть ли у пользователя права на выполнение этого действия"})
    readonly message: string;
}