import { ApiProperty } from "@nestjs/swagger";

export class CreateVacancyDto {
    readonly title: string;
    readonly content: string;
    readonly workMode: string;
    readonly userId: number;
}