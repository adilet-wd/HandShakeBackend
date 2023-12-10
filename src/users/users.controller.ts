import { Body, Controller, Post, Get, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decarator';
import { RolesGuard } from 'src/auth/roles.guard';



@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    
    constructor(private usersService: UsersService){}


    // Создание пользователя с по userDto
    @ApiOperation({summary: "Создание пользователя"})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() userDto: CreateUserDTO){
        return this.usersService.createUser(userDto);
    }

    // Получение всех пользователей.Возвращает массива с пользователями
    @ApiOperation({summary: "Получение всех пользователей"})
    @ApiResponse({status: 200, type: [User]})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(){
        return this.usersService.getAllUsers();
    }

    // Возвращает пользователя по его PK
    @ApiOperation({summary: "Получение пользователя по Primal Key"})
    @ApiResponse({status: 200, type: User})
    @Get('/:id')
    get(@Param('id') id: number){
        return this.usersService.getOneUser(id);    
    }

    // Удаляет пользователя по его PK
    @ApiOperation({summary: "Удаление пользователя по Primal Key"})
    @ApiResponse({status: 410, type: User})
    @Delete('/:id')
    delete(@Param('id') id: number){
        return this.usersService.deleteUser(id);
    }
}
