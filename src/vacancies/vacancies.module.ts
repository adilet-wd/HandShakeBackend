import { Module } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { VacanciesController } from './vacancies.controller';
import { Vacancy } from './entities/vacancies.model';
import { User } from 'src/users/entities/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';
import { Employer } from 'src/employer/entities/employers.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [VacanciesService],
  controllers: [VacanciesController],
  imports: [
      UsersModule,
      AuthModule,
      SequelizeModule.forFeature([Vacancy, Employer]),
    ],
})
export class VacanciesModule {}
