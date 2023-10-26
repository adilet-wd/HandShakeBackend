import { Body, Controller, Post, Get, Put, Delete, Param } from '@nestjs/common';
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
    @Get(':id')
    get(@Param('id') id: number){
        return this.usersService.getOneUser(id);    
    }
    @Delete(':id')
    delete(@Param('id') id: number){
        return this.usersService.deleteUser(id);
    }
}
