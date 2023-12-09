import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDTO } from './dto/create-user.dto';
import { RolesService } from 'src/role/roles.service';


@Injectable()
export class UsersService {
    
    constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RolesService) {

    }

    // Создание пользователя по модели 
    async createUser(dto: CreateUserDTO){
        const user = await this.userRepository.create(dto);
        // Получаем роль со значением USER и присваивает пользователю эту роль
        const role = await this.roleService.getRoleByValue("USER")
        // Добавляем роль пользователя в бд
        await user.$set('roles', [role.id])
        // Добавляем роль пользователю
        user.roles = [role];
        return user;
    }
    
    async getAllUsers(){
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async getOneUser(id: number){
        const user = await this.userRepository.findByPk(id);
        return user;
    }

    // Получение пользователя по его почте(уникальная почта)
    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where:{email}, include: {all: true}});
        return user;
    }
    
    async deleteUser(id: number){
        const user = await this.userRepository.findByPk(id);
        await user.destroy();
        return user;
    }


}
