import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService
        , private jwtService: JwtService){}

    async login(userDto: CreateUserDTO){

    }
    async registration(userDto: CreateUserDTO){
        const candidate = await this.userService.getUserByEmail(userDto.email);
        
        // Проверка наличия такого user в бдшке
        if (candidate){
            throw new HttpException("Пользователь с таким email существует", HttpStatus.BAD_REQUEST)
        }
        // Хэширование пароля и создание пользователя с подобным поролем
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user)
    
    }
// Создание токена для пользователя
    async generateToken(user){
        const payLoad = {email: user.email, id: user.id, roles: user.roles}

        return{
            token: this.jwtService.sign(payLoad)
        }
    }

}
