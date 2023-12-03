import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDTO } from './dto/create-role.dto';
import { Role } from './roles.model';

@ApiTags("Роли")
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService){}

    @ApiOperation({summary: "Создание роли"})
    @ApiResponse({status: 200, type: Role})
    @Post()
    create(@Body() roleDto: CreateRoleDTO){
        return this.roleService.createRole(roleDto);
    }

    @ApiOperation({summary: "Получение всех ролей"})
    @ApiResponse({status: 200, type: Role})
    @Get()
    getAllRoles(){
        return this.roleService.getAllRoles();
    }

    @ApiOperation({summary: "Получение роли"})
    @ApiResponse({status: 200, type: Role})
    @Get("/:value")
    getByValue(@Param("value") value: string){
        return this.roleService.getRoleByValue(value)
    }

    @ApiOperation({summary: "Удаление роли"})
    @ApiResponse({status: 200, type: Role})
    @Delete("/:value")
    deleteRole(@Param("value") value: string){
        return this.roleService.deleteRole(value)
    }

}
