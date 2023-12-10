import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login-auth.dto';
import { error } from 'console';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService
        , private jwtService: JwtService){}

    async login(userDto: LoginUserDto){
        const user = await this.validateUser(userDto);
        return {
            accessToken: await this.generateAccessToken(user),
            refreshToken: await this.generateRefreshToken(user)
        }
    }

    async registration(userDto: CreateUserDTO){
        
        const candidate = await this.userService.getUserByEmail(userDto.email);
        
        // Проверка наличия такого user в бдшке
        if (candidate){
            throw new HttpException("Пользователь с таким email существует", HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword})
    
        return {
            accessToken: await this.generateAccessToken(user),
            refreshToken: await this.generateRefreshToken(user)
        }

    }


    async refreshAccessToken(authHeader: string) {
    
        try {
            const bearer = authHeader.split(' ')[0];
            const refreshToken = authHeader.split(' ')[1];

            if (bearer !== "Bearer" || !refreshToken) {
                throw new UnauthorizedException("Invalid token")   
            }

            const decodedToken = this.jwtService.decode(refreshToken);
            
            // Проверьте, имеет ли RefreshToken необходимые поля
            if (decodedToken.email || decodedToken.id) {
                const user = await this.userService.getUserByEmail(decodedToken.email);
                return {
                    accessToken: await this.generateAccessToken(user),
                }
            } else {
                throw new HttpException(
                    {status: HttpStatus.BAD_REQUEST, message: 'Invalid refresh token',}
                    , HttpStatus.BAD_REQUEST);
            }

        } catch(error) {
            throw new HttpException(
                    {status: HttpStatus.BAD_REQUEST, message: 'Invalid refresh token',}
                    , HttpStatus.BAD_REQUEST);
        }
      }

    private async generateAccessToken(user) {
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return this.jwtService.sign(payload, { expiresIn: '30s' }); 
    }

    private async generateRefreshToken(user) {
        const payload = {email: user.email, id: user.id}
        return this.jwtService.sign(payload, { expiresIn: '7d' }); 
    }


    private async validateUser(userDto: LoginUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email); 
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        } else {
            throw new UnauthorizedException({message: "Некорректный email или пароль"});
        }
    }

}
