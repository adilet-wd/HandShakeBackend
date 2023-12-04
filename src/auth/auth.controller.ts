import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags("Авторизация")
@Controller('auth')
export class AuthController {


    constructor(private authService: AuthService){}

    @Post('/login')
    login(@Body() userDto: CreateUserDTO){
        this.authService.login(userDto);
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDTO){
        this.authService.registration(userDto);
    }
    // Проверка
}
