import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

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

    }

}
