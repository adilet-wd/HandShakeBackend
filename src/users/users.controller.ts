import { Body, Headers, Controller, Post, Get, Put, Delete, Param, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDTO } from './dto/user-create.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decarator';
import { RolesGuard } from 'src/auth/roles-auth.guard';
import { RoleAddDto } from './dto/role-add.dto';
import { UserBanDto } from './dto/user-ban.dto';
import { UserGetDto } from './dto/user-get.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { AuthService } from 'src/auth/auth.service';
import { MyProfileUnauthorizedResponse } from './dto/myProfle-responses.dto';
import { UnauthorizedResponse } from '../dto/unauthorized-response.dto';
import { UnauthorizedApiResponse } from 'src/decorators/unauthorized.decorator';



@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService){}

    @ApiOperation({summary: "Получение всех пользователей"})
    @ApiResponse({status: 200, type: [User]})
    // @Roles("ADMIN")
    // @UseGuards(RolesGuard)
    // @UseGuards(JwtAuthGuard)
    @Get()
    getAll(){
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: "Получение личного профиля пользователя  по его accesToken"})
    @ApiResponse({status: 200, type: User})
    @ApiResponse({status: 401, type: UnauthorizedResponse})
    @UnauthorizedApiResponse()
    @UseGuards(JwtAuthGuard)
    @Get('/myProfile')
    getMyProfile(@Headers("authorization") authHeader: string){
        return this.usersService.getMyProfile(authHeader);
    }

    // @ApiOperation({summary: "Блокировка пользователя"})
    // @ApiResponse({status: 200})
    // @Roles("ADMIN")
    // @UseGuards(RolesGuard)
    // @UseGuards(JwtAuthGuard)
    // @Post('/ban')
    // banUser(@Body() dto: UserBanDto){
    //     return this.usersService.banUser(dto);    
    // }

     // Создание пользователя
    // @ApiOperation({summary: "Создание пользователя"})
    // @ApiResponse({status: 200, type: User})
    // @Post()
    // create(@Body() userDto: CreateUserDTO){
    //     return this.authService.registration(userDto);
    // }

        // // Удаляет пользователя по его почте
    // @ApiOperation({summary: "Удаление пользователя по почте"})
    // @ApiResponse({status: 410, type: ""})
    // // @Roles("ADMIN")
    // // @UseGuards(RolesGuard)
    // // @UseGuards(JwtAuthGuard)
    // @Delete('/user')
    // delete(@Body() dto: GetUserDto){
    //     return this.usersService.deleteUserByEmail(dto.email);
    // }

    // @ApiOperation({summary: "Выдача роли пользователю"})
    // @ApiResponse({status: 200})
    // @Post('/role')
    // addRole(@Body() dto: AddRoleDto){
    //     return this.usersService.addRoleToUser(dto);    
    // }

    // Возвращение пользователя по его почте
    // @ApiOperation({summary: "Получение пользователя по почте"})
    // @ApiResponse({status: 200, type: User})
    // @Get('/user')
    // getOneByEmail(@Body() dto: GetUserDto){
    //     return this.usersService.getUserByEmail(dto.email);    
    // }

    
}
