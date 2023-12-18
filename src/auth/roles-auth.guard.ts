import { CanActivate, ExecutionContext, ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles-auth.decarator";



@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private jwtService: JwtService, 
        private reflector: Reflector) {

    }
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            // Получение списка ролей, необходимых для выполнения
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ])  

            if (!requiredRoles) {
                return true
            }

            // Получение данных из хедера
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            // Проверка типа токена
            if (bearer !== "Bearer" || !token) {
                throw new ForbiddenException({message: "Нет доступа"})
            }

            // Верификация токена
            const user = this.jwtService.verify(token);
            req.user = user;

            // Результат проверки роли пользователя
            if (user.roles.some(role => requiredRoles.includes(role.value))) {
                return true;
            } else {
                throw new ForbiddenException({message: "Нет доступа"})
            }

        } catch(e) {
            throw new ForbiddenException({message: "Нет доступа"})
        }
    }
    
}