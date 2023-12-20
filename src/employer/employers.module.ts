import { Module } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { EmployersController } from './employers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/entities/users.model';
import { Employer } from './entities/employers.model';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { Vacancy } from 'src/vacancies/entities/vacancies.model';

@Module({
  providers: [EmployersService],
  controllers: [EmployersController],
  imports: [
    UsersModule,
    AuthModule,
    SequelizeModule.forFeature([Employer, User, Vacancy]),
  ],
  exports: [
  ]
})
export class EmployerModule {}
