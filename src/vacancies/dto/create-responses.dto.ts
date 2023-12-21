import { ApiProperty } from "@nestjs/swagger";

export class CreateResponseDto {
    @ApiProperty({example: "Вакансия успешно создана", description: "Создалась ли вакансия"})
    readonly message: string;
    @ApiProperty({example: "1", description: "id вакансии"})
    readonly id: string;
}

export class CreateBadRequestResponseDto {
    @ApiProperty({example: "Должно быть строкой. Название вакансии. Не меньше 1 символа и не длинее 60.", description: "Требования к названию вакансии"})
    readonly title: string;

    @ApiProperty({example: "Должно быть строкой. Не меньше 1 символа и не длинее 800. Контентная часть не может быть пустой. ", description: "Требования к контентной части."})
    readonly content: string;

    @ApiProperty({example: "Должно быть строкой. Не меньше 1 символа и не длинее 300. Обязанности не должны быть пустыми", description: "Требования к обязанностям."})
    readonly duties: string;

    @ApiProperty({example: "Должно быть строкой. Не меньше 1 символа и не длинее 400. Требования не должны быть пустыми", description: "Требования к требованиям. "})
    readonly requirements: string;

    @ApiProperty({example: "Должно быть строкой. Не меньше 1 символа и не длинее 40. Режим работы не должен быть пустым.", description: "Требования к режиму работы. "})
    readonly workMode: string;


}