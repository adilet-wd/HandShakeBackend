import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VacanciesService } from './vacancies.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';


@ApiTags("Вакансии")
@Controller('vacancies')
export class VacanciesController {
    
    constructor(private vacanciesService: VacanciesService){}

    @Post()
    createVacancy(@Body() dto: CreateVacancyDto){
        return this.vacanciesService.createVacancy(dto);
    }
}
