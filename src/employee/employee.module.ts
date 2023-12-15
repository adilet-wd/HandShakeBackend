import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { Employee } from './entities/employee.model';
import { User } from 'src/users/entities/users.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [EmployeeService],
  controllers: [EmployeeController],
  imports: [
    SequelizeModule.forFeature([Employee, User]),
  ],
})
export class EmployeeModule {}
