import { Body, Controller, Headers, Post, UsePipes } from '@nestjs/common';
import { ApiResponse, ApiOperation,  ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-auth.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { LoginTokensDto } from './dto/login-tokens.dto';
import { TokenClass } from 'typescript';
import { RefreshAccessTokenResponse } from './dto/refreshAccessToken-response.dto';


@ApiTags("Авторизация")
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @ApiOperation({summary: "Авторизация пользователя"})
    @ApiResponse({status: 200, type: LoginTokensDto})
    @Post('/login')
    login(@Body() userDto: LoginUserDto){
        return this.authService.login(userDto);
    }

    @ApiOperation({summary: "Регистрация пользователя"})
    @ApiResponse({status: 200, type: LoginTokensDto})
    @Post('/registration')
    registration(@Body() userDto: CreateUserDTO){
        return this.authService.registration(userDto);
    }
    // Проверка

    @ApiOperation({summary: "Обновление accesToken"})
    @ApiResponse({status: 200, type: RefreshAccessTokenResponse })
    @Post('/refresh-accessToken')
    refreshAccesToken(@Headers("authorization") authHeader: string){
        return this.authService.refreshAccessToken(authHeader);
    }
}
