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
        const roles = await this.roleRepository.findAll();
        return roles;
    }

    async getRoleByValue(value: string){
        const role = await this.roleRepository.findOne({where: {value}});
        return role;

    }

    async deleteRole( value: string) {
        const role = await this.roleRepository.findOne({where: {value}});
        await role.destroy();
        return role;
    }
}
