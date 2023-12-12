import { Body, Controller, Post, Get, Put, Delete, Param, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decarator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';



@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    
    constructor(private usersService: UsersService){}


    // Создание пользователя
    @ApiOperation({summary: "Создание пользователя"})
    @ApiResponse({status: 200, type: User})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDTO){
        return this.usersService.createUser(userDto);
    }

    // Получение всех пользователей. Возвращает массив пользователей
    @ApiOperation({summary: "Получение всех пользователей"})
    @ApiResponse({status: 200, type: [User]})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(){
        return this.usersService.getAllUsers();
    }

    // Возвращает пользователя по его почте
    @ApiOperation({summary: "Получение пользователя по почте"})
    @ApiResponse({status: 200, type: User})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Get('/user')
    get(@Body() dto: GetUserDto){
        return this.usersService.getUserByEmail(dto.email);    
    }

    
    // Удаляет пользователя по его почте
    @ApiOperation({summary: "Удаление пользователя по почте"})
    @ApiResponse({status: 410, type: User})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Delete('/user')
    delete(@Body() dto: GetUserDto){
        return this.usersService.deleteUserByEmail(dto.email);
    }

    // Выдача роли пользователю
    @ApiOperation({summary: "Выдача роли пользователю"})
    @ApiResponse({status: 200})
    @Post('/role')
    addRole(@Body() dto: AddRoleDto){
        return this.usersService.addRoleToUser(dto);    
    }

    // // Забрать роль у пользователя
    // @ApiOperation({summary: "Удаление роли у пользователя"})
    // @ApiResponse({status: 200})
    // @Roles("ADMIN")
    // @UseGuards(RolesGuard)
    // @UseGuards(JwtAuthGuard)
    // @Delete('/role')
    // deleteRole(@Body() dto: AddRoleDto){
    //     return this.usersService.deleteRoleFromUser(dto);    
    // }

    
    // Блокировка пользователя
    @ApiOperation({summary: "Блокировка пользователя"})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Post('/ban')
    banUser(@Body() dto: BanUserDto){
        return this.usersService.banUser(dto);    
    }
    
}
