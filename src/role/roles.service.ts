import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './entities/roles.model';
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

    // Получение роли по значению роли, т.е получение роли из бд по значению к примеру "ADMIN"
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
