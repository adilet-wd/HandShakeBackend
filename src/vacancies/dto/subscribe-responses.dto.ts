import { ApiProperty } from "@nestjs/swagger";

export class SubscribeResponseDto {
    @ApiProperty({example: "Вы успешно подписались на вакансию", description: "Получилось ли подписаться на вакансию"})
    readonly message: string;
}

export class SubscribeBadRequestResponseDto {
    @ApiProperty({example: "Должно быть числом. Айди вакансии не должно быть пустым.", description: "Требования к айди вакансии"})
    readonly id: string;
}

export class SubscribeNotAcceptableResponseDto {
    @ApiProperty({example: "Вакансия не найдена", description: "Есть ли такая вакансия в бд"})
    readonly message: string;
}

export class SubscribeConflictResponseDto {
    @ApiProperty({example: "Вы уже подписаны на эту вакансию", description: "Подписаны ли вы уже на эту вакансию"})
    readonly message: string;
}