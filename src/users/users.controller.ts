import { Body, Controller, Post, Get, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    
    constructor(private usersService: UsersService){}

    @Post()
    create(@Body() userDto: CreateUserDTO){
        return this.usersService.createUser(userDto);
    }

    @Get()
    getAll(){
        return this.usersService.getAllUsers();
    }
}
