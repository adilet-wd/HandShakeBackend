import { ApiProperty } from "@nestjs/swagger";

export class UserBanDto {
    @ApiProperty({example: "12", description: "PK пользователя"})
    readonly userId: number;
    @ApiProperty({example: "Нарушение правила 1.1", description: "Причина блокировки"})
    readonly banReason: string;
}