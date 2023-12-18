import { HttpException, HttpStatus, Injectable, NotFoundException, Optional } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/users.model';
import { UserCreateDTO } from './dto/user-create.dto';
import { RolesService } from 'src/role/roles.service';
import { RoleAddDto } from './dto/role-add.dto';
import { UserBanDto } from './dto/user-ban.dto';
import { UserGetDto } from './dto/user-get.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

interface ValidationResult {
    validated: boolean;
    decodedToken?: any;
}  

@Injectable()
export class UsersService {
    
    constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RolesService, private jwtService: JwtService) {

    }

    // Создание пользователя по модели 
    async createUser(dto: UserCreateDTO){
        try {
            const { role, ...updatedDto } = dto;
            const userRole = await this.roleService.getRoleByValue(dto.role);

            if(userRole.value  === "EMPLOYEE") {
                const user = await this.userRepository.create(updatedDto);
                // Добавляем роль пользователя в бд
                await user.$set('roles', [userRole.id]);
                // Добавляем роль пользователю
                user.roles = [userRole];
                // Добалвляем связь пользователя с employee
                await user.$create('employee', {userId: user.id});
                if (user.employer) {
                    await user.$remove('employer', user.employer.id);
                }
                return user;
            } 
            else if (userRole.value  === "EMPLOYER") {
                const user = await this.userRepository.create(updatedDto);
                // Добавляем роль пользователя в бд
                await user.$set('roles', [userRole.id])
                // Добавляем роль пользователю
                user.roles = [userRole];
                // Добалвяем связь пользователя с employer
                await user.$create('employer', {userId: user.id})
                return user;
            }
            else {
                throw new HttpException("Invalid data", HttpStatus.BAD_REQUEST);
            }

        } catch (error){
            throw new HttpException(`"Invalid data ${error}"`, HttpStatus.BAD_REQUEST);
        }   
    }
    
    // Возвращает массив пользователей со всеми связями
    async getAllUsers(){
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    // Получение пользователя по его почте(уникальная почта)
    // Возвращает пользователя со всеми его связями
    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where:{email: email}, include: {all: true}});
        return user;
    }

    // Получение личного кабинета пользователя по его accesToken
    // Возвращает пользователя со всеми его связями
    async getMyProfile(authHeader: string) {
        try {
            const result = await this.validateAccesToken(authHeader);
            if (result.validated) {
                const decodedToken = result.decodedToken;
                const user = await this.getUserByEmail(decodedToken.email);
                return user
            } else {
                throw new HttpException(
                    {status: HttpStatus.BAD_REQUEST, message: 'Недействительный access token',}
                    , HttpStatus.BAD_REQUEST);
            }
        } catch(error) {
            throw new HttpException(
                    {status: HttpStatus.BAD_REQUEST, message: 'Недействительный access token',}
                    , HttpStatus.BAD_REQUEST);
        }
    }

    // Проверка валидности accesToken, если токен валиден возвращает объект с свойствами validated: true и decodedToken: декодированный токен. Если не валиден то возвращает false.
    async validateAccesToken(authHeader: string): Promise<ValidationResult> {
        try {
            const bearer = authHeader.split(' ')[0];
            const accesToken = authHeader.split(' ')[1];
            if (bearer !== "Bearer" || !accesToken) {
                throw new HttpException(
                    {status: HttpStatus.BAD_REQUEST, message: 'Недействительный access token',}
                    , HttpStatus.BAD_REQUEST);
            }
            const decodedToken = this.jwtService.decode(accesToken);
    
            // Проверьте, имеет ли accesToken необходимые поля
            if (decodedToken.email || decodedToken.id || decodedToken.roles) {
                return {
                    validated: true,
                    decodedToken: decodedToken
                };
            } else {
                return {
                    validated: false
                };
            }
    
        } catch(error) {
            return {
                validated: false
            };
        }
    }



    
    // async deleteUserByEmail(email: string){
    //     try {

    //         const user = await this.userRepository.findOne({where:{email: email}, include: {all: true}});
    //         if (user) {
    //             await user.destroy();
    //             return user;
    //         }
            
    //     } catch (error){
    //         throw new HttpException("Invalid data", HttpStatus.BAD_REQUEST);
    //     }
    // }

    // async addRoleToUser(dto: RoleAddDto){
    //     const user = await this.userRepository.findByPk(dto.userId);
    //     const role = await this.roleService.getRoleByValue(dto.value);

    //     if (role && user) {
    //         await user.$add('roles', role.id);
    //         return dto;
    //     } 

    //     throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)

    // }

    // async deleteRoleFromUser(dto: AddRoleDto){
    //     const user = await this.userRepository.findByPk(dto.userId);
    //     const role = await this.roleService.getRoleByValue(dto.value);

    //     if (role && user) {
    //         await user.$remove('roles', role.id);
    //         return dto;
    //     } 

    //     throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)

    // }
    

    // Блокировка пользователя
    
    // async banUser(dto: UserBanDto) {
    //     const user = await this.userRepository.findByPk(dto.userId);
    //     user.banned = true;
    //     user.banReason = dto.banReason;
    //     await user.save();
    //     return user;
    // }


}
