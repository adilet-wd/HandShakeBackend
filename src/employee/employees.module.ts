import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { Employee } from './entities/employees.model';
import { User } from 'src/users/entities/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [EmployeesService],
  controllers: [EmployeesController],
  imports: [
    UsersModule,
    AuthModule,
    SequelizeModule.forFeature([Employee, User]),
  ],
  exports: [
    EmployeesService
  ]
})
export class EmployeesModule {}
