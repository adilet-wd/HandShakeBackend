import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { CreateRoleDTO } from './dto/create-role.dto';

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private roleRepository: typeof Role){
    }

    async createRole(dto: CreateRoleDTO){
        const role = await this.roleRepository.create(dto);
        return role;
        
    }

    async getAllRoles(){
        const users = await this.roleRepository.findAll();
        return users;
    }

    async getRoleByValue(value: string){
        const role = await this.roleRepository.findOne({where: {value}});
        if (!role) {
            throw new NotFoundException("role not found");
        }
        return role;
    }
}
