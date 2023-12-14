import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { RolesService } from './role/roles.service';
import { RolesModule } from './role/roles.module';
import { Role } from "./role/roles.model";
import { UserRoles } from "./role/user-roles.model";
import { UsersService } from "./users/users.service";
import { UsersController } from "./users/users.controller";
import { AuthModule } from './auth/auth.module';
import { VacanciesController } from './vacancies/vacancies.controller';
import { VacanciesModule } from './vacancies/vacancies.module';
import { VacanciesService } from './vacancies/vacancies.service';
import { Vacancy } from "./vacancies/vacancies.model";
 
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
          models: [User, Role, UserRoles, Vacancy],
          autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        VacanciesModule,
      ],
})
export class AppModule {};  