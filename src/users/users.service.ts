import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDTO } from './dto/create-user.dto';
import { RolesService } from 'src/role/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { error } from 'console';


@Injectable()
export class UsersService {
    
    constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RolesService) {

    }

    // Создание пользователя по модели 
    async createUser(dto: CreateUserDTO){
        try {
            const { role, ...updatedDto } = dto;
            const userRole = await this.roleService.getRoleByValue(dto.role);

            if (userRole) {
                const user = await this.userRepository.create(updatedDto);
                // Добавляем роль пользователя в бд
                await user.$set('roles', [userRole.id])
                // Добавляем роль пользователю
                user.roles = [userRole];
                return user; 
            } else {
                throw new HttpException("Invalid data", HttpStatus.BAD_REQUEST);
            }

        } catch (error){
            throw new HttpException("Invalid data", HttpStatus.BAD_REQUEST);
        }
        
    }
    
    async getAllUsers(){
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    // Получение пользователя по его почте(уникальная почта)
    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where:{email: email}, include: {all: true}});
        return user;
    }
    
    async deleteUserByEmail(email: string){
        try {

            const user = await this.userRepository.findOne({where:{email: email}, include: {all: true}});
            if (user) {
                await user.destroy();
                return user;
            }
            
        } catch (error){
            throw new HttpException("Invalid data", HttpStatus.BAD_REQUEST);
        }
    }

    async addRoleToUser(dto: AddRoleDto){
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);

        if (role && user) {
            await user.$add('roles', role.id);
            return dto;
        } 

        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)

    }

    // async deleteRoleFromUser(dto: AddRoleDto){
    //     const user = await this.userRepository.findByPk(dto.userId);
    //     const role = await this.roleService.getRoleByValue(dto.value);

    //     if (role && user) {
    //         await user.$remove('roles', role.id);
    //         return dto;
    //     } 

    //     throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)

    // }
    

    // Блокировка пользователя
    async banUser(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }


}
