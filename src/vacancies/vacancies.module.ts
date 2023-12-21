import { Module } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { VacanciesController } from './vacancies.controller';
import { Vacancy } from './entities/vacancies.model';
import { User } from 'src/users/entities/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';
import { Employer } from 'src/employer/entities/employers.model';
import { AuthModule } from 'src/auth/auth.module';
import { EmployeesModule } from 'src/employee/employees.module';
import { EmployersModule } from 'src/employer/employers.module';
import { ApplicatedVacancy } from './entities/applicated_vacancies.model';

@Module({
  providers: [VacanciesService],
  controllers: [VacanciesController],
  imports: [
      UsersModule,
      AuthModule,
      EmployeesModule,
      EmployersModule,
      SequelizeModule.forFeature([Vacancy, ApplicatedVacancy]),
    ],
})
export class VacanciesModule {}
