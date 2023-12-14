import { Module } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { VacanciesController } from './vacancies.controller';
import { Vacancy } from './vacancies.model';
import { User } from 'src/users/users.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    providers: [VacanciesService],
    controllers: [VacanciesController],
    imports: [
        SequelizeModule.forFeature([User, Vacancy]),
      ],
})
export class VacanciesModule {}
