import { Body, Controller, Post, Get, Put, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';


@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    
    constructor(private usersService: UsersService){}

    @ApiOperation({summary: "Создание пользователя"})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() userDto: CreateUserDTO){
        return this.usersService.createUser(userDto);
    }


    @ApiOperation({summary: "Получение всех пользователей"})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getAll(){
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: "Получение пользователя по Primal Key"})
    @ApiResponse({status: 200, type: User})
    @Get(':id')
    get(@Param('id') id: number){
        return this.usersService.getOneUser(id);    
    }


    @ApiOperation({summary: "Удаление пользователя по Primal Key"})
    @ApiResponse({status: 410, type: User})
    @Delete(':id')
    delete(@Param('id') id: number){
        return this.usersService.deleteUser(id);
    }
}
