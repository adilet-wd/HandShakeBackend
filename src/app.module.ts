import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/entities/users.model";
import { RolesService } from './role/roles.service';
import { RolesModule } from './role/roles.module';
import { Role } from "./role/entities/roles.model";
import { UserRoles } from "./role/entities/user_roles.model";
import { UsersService } from "./users/users.service";
import { UsersController } from "./users/users.controller";
import { AuthModule } from './auth/auth.module';
import { VacanciesController } from './vacancies/vacancies.controller';
import { VacanciesModule } from './vacancies/vacancies.module';
import { VacanciesService } from './vacancies/vacancies.service';
import { Vacancy } from "./vacancies/entities/vacancies.model";
import { EmployeesModule } from "./employee/employees.module";
import { Employee } from "./employee/entities/employees.model";
import { EmployersModule } from './employer/employers.module';
import { Employer } from "./employer/entities/employers.model";
import { ApplicatedVacancy } from "./vacancies/entities/applicated_vacancies.model";
 
@Module({
    controllers: [], 
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        // Данные для вход в базу данных postgreSQL
        SequelizeModule.forRoot(  {
          dialect: 'postgres',
          host: process.env.POSTGRES_HOST, 
          port: Number(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USER, 
          password: process.env.POSTGRESS_PASSWORD,
          database: process.env.POSTGRES_DB,
          models: [User, Role, UserRoles, Vacancy, Employee, Employer, ApplicatedVacancy],
          autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        VacanciesModule,
        EmployeesModule,
        EmployersModule,
      ],
})
export class AppModule {};  