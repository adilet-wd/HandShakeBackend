import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { Employee } from './entities/employee.model';
import { User } from 'src/users/entities/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [EmployeeService],
  controllers: [EmployeeController],
  imports: [
    UsersModule,
    SequelizeModule.forFeature([Employee, User]),
  ],
})
export class EmployeeModule {}
