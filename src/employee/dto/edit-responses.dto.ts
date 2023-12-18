import { ApiProperty } from "@nestjs/swagger";

export class EditResponseDto {
    @ApiProperty({example: "Данные пользователя успешно обновлены", description: "Обновились ли данные"})
    readonly message: string;
}

export class EditBadRequestResponseDto {
    @ApiProperty({example: "Должно быть строкой. Место обучения не должно быть пустым", description: "Требования к месту обучения"})
    readonly studyLocation: string;
    @ApiProperty({example: "Неправильная дата рождения(Должно быть старше 16, младше 120). Неправильный формат даты. Дата рождения не должна быть пустой. Формат даты YYYY-MM-DD", description: "Требования к дате рождения"})
    readonly dateOfBirth: string;
    @ApiProperty({example: "Должно быть либо MALE либо FEMALE. Пол не должен быть пустым", description: "Требования к полу"})
    readonly gender: string;
}