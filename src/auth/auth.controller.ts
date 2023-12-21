import { Body, Controller, Headers, Post, UsePipes } from '@nestjs/common';
import { ApiResponse, ApiOperation,  ApiTags } from '@nestjs/swagger';
import { UserCreateDTO } from 'src/users/dto/user-create.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-auth.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { LoginResponseDto, LoginResponseUnauthorizedDto } from './dto/login-responses.dto';
import { TokenClass } from 'typescript';
import { RefreshAccessTokenBadRequstResponse, RefreshAccessTokenResponse } from './dto/refreshAccessToken-responses.dto';
import { RegistationBadRequestResponseDto, RegistationConflictResponseDto, RegistationResponseDto } from './dto/registration-responses.dto';


@ApiTags("Авторизация")
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @ApiOperation({summary: "Авторизация пользователя"})
    @ApiResponse({status: 200, type: LoginResponseDto})
    @ApiResponse({status: 401, type: LoginResponseUnauthorizedDto})
    @Post('/login')
    login(@Body() userDto: LoginUserDto){
        return this.authService.login(userDto);
    }

    @ApiOperation({summary: "Регистрация пользователя"})
    @ApiResponse({status: 200, type: RegistationResponseDto})
    @ApiResponse({status: 400, type: RegistationBadRequestResponseDto})
    @ApiResponse({status: 409, type: RegistationConflictResponseDto})
    @Post('/registration')
    registration(@Body() userDto: UserCreateDTO){
        return this.authService.registration(userDto);
    }
    // Проверка

    @ApiOperation({summary: "Обновление accesToken"})
    @ApiResponse({status: 200, type: RefreshAccessTokenResponse })
    @ApiResponse({status: 400, type: RefreshAccessTokenBadRequstResponse})
    @Post('/refresh-accessToken')
    refreshAccesToken(@Headers("authorization") authHeader: string){
        return this.authService.refreshAccessToken(authHeader);
    }
}
