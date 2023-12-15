import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Role } from './entities/roles.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/entities/users.model';
import { UserRoles } from './entities/user-roles.model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    SequelizeModule.forFeature([Role, User, UserRoles])
  ],
  exports: [
    RolesService
  ]
})
export class RolesModule {}
