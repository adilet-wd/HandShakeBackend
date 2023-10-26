import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    
    constructor(@InjectModel(User) private userRepository: typeof User) {

    }

    async createUser(dto: CreateUserDTO){
        const user = await this.userRepository.create(dto);
        return user;
    }
    
    async getAllUsers(){
        const users = await this.userRepository.findAll();
        return users;
    }

    async getOneUser(id: number) {
        const user = await this.userRepository.findByPk(id);
        if (!user) {
            throw new NotFoundException("user not found");
        }
        return user;
    }
    
    async deleteUser(id: number){
        const user = await this.userRepository.findByPk(id);
        if (user) {
            await user.destroy();
            throw new NotFoundException(`user ${id} was deleted`);
        } else if (!user) {
            throw new NotFoundException("user not found");
        }
        return user;
    }
}
