import { ApiProperty } from "@nestjs/swagger";

export class EditResponseDto {
    @ApiProperty({example: "Данные пользователя успешно обновлены", description: "Обновились ли данные"})
    readonly message: string;
}

export class EditBadRequestResponseDto {
    @ApiProperty({example: "Должно быть строкой. Не меньше 1 символа и не длинее 40. Название компании не должно быть пустым", description: "Требования к названию компании"})
    readonly companyName: string;
    @ApiProperty({example: "Должно быть строкой. Не меньше 1 символа и не длинее 500. Информация о компании не должна быть пустой"})
    readonly companyDescription: string;
    @ApiProperty({example: "Должно быть строкой. Не меньше 1 символа и не длинее 80. Место расположения головного офиса не может быть пустым", description: "Требования к месту расположения."})
    readonly location: string;
}