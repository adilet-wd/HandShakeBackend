import { Controller, Headers, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeeUpdateDto } from './dto/employee-update.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UnauthorizedApiResponse } from 'src/decorators/unauthorized.decorator';
import { EditBadRequestResponseDto, EditResponseDto } from './dto/edit-responses.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decarator';
import { RolesGuard } from 'src/auth/roles-auth.guard';
import { ForbiddenApiResponse } from 'src/decorators/forbidden-response.decorator';

@ApiTags('Работники')
@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @ApiOperation({summary: "Изменение данных о работнике"})
  @ApiResponse({status: 200, type: EditResponseDto})
  @ApiResponse({status: 400, type: EditBadRequestResponseDto})
  @UnauthorizedApiResponse()
  @ForbiddenApiResponse()
  @Roles("EMPLOYEE")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch('/edit')
  update(@Headers("authorization") updateHeader: string, @Body() updateEmployeeDto: EmployeeUpdateDto) {
    return this.employeesService.update(updateHeader, updateEmployeeDto);
  }

}
