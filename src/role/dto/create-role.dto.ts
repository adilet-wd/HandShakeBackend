import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDTO {
    @ApiProperty({example: "Admin", description: "Роль"})
    readonly value: string;
    @ApiProperty({example: "Администратор", description: "Описание роли"})
    readonly description: string;
}