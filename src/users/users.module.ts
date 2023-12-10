import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from 'src/role/roles.model';
import { UserRoles } from 'src/role/user-roles.model';
import { RolesModule } from 'src/role/roles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
    RolesModule,
    forwardRef(()=> AuthModule),
  ],
  exports: [
    UsersService,
  ]
})
export class UsersModule {}
