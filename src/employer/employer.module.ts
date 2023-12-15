import { Module } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { EmployerController } from './employer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/entities/users.model';
import { Employer } from './entities/employer.model';

@Module({
  providers: [EmployerService],
  controllers: [EmployerController],
  imports: [
    SequelizeModule.forFeature([Employer, User]),
  ],
})
export class EmployerModule {}
