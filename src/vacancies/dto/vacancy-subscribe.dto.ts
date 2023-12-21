import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Length, Matches } from "class-validator";

export class VacancySubscribeDto {
    @ApiProperty({example: "1", description: "Айди вакансии. Не меньше 1 символа и не длинее 60. Айди вакансии не может быть пустым."})
    @IsNotEmpty({ message: 'Айди вакансии не должно быть пустым' })
    @IsNumber({}, {message: "Должно быть числом"})
    readonly id: number;
}