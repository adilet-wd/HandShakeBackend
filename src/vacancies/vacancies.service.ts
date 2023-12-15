import { Injectable } from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { Vacancy } from './vacancies.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class VacanciesService {

    constructor(@InjectModel(Vacancy) private vacancyRepository: typeof Vacancy){

    }

    async createVacancy (dto: CreateVacancyDto) {
        const vacancy = await this.vacancyRepository.create(dto);
        return vacancy;
    }
}
