import { Module } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { EmployersController } from './employers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/entities/users.model';
import { Employer } from './entities/employers.model';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [EmployersService],
  controllers: [EmployersController],
  imports: [
    UsersModule,
    AuthModule,
    SequelizeModule.forFeature([Employer, User]),
  ],
  exports: [
  ]
})
export class EmployerModule {}
