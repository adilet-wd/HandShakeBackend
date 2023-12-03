import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDTO } from './dto/create-user.dto';
import { RolesService } from 'src/role/roles.service';
import { response } from 'express';


@Injectable()
export class UsersService {
    
    constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RolesService) {

    }

    async createUser(dto: CreateUserDTO){
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("USER")
        await user.$set('roles', [role.id]);
        return user;
    }
    
    async getAllUsers(){
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async getOneUser(id: number) {
        const user = await this.userRepository.findByPk(id);
        return user;
    }
    
    async deleteUser(id: number){
        const user = await this.userRepository.findByPk(id);
        await user.destroy();
        return user;
    }
}
