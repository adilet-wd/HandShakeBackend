import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {
    @ApiProperty({example: "12", description: "PK пользователя"})
    readonly userId: number;
    @ApiProperty({example: "ADMIN", description: "Роль для выдачи"})
    readonly value: string;
}