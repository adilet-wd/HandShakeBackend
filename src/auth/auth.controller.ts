import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-auth.dto';

@ApiTags("Авторизация")
@Controller('auth')
export class AuthController {


    constructor(private authService: AuthService){}

    @Post('/login')
    login(@Body() userDto: LoginUserDto){
        return this.authService.login(userDto);
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDTO){
        return this.authService.registration(userDto);
    }
    // Проверка

    @Post('/refresh-accessToken')
    refreshAccesToken(@Headers("authorization") authHeader: string){
        return this.authService.refreshAccessToken(authHeader);
    }
}
