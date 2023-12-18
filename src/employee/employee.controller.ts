import { Controller, Headers, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/employee-create.dto';
import { EmployeeUpdateDto } from './dto/employee-update.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UnauthorizedApiResponse } from 'src/decorators/unauthorized.decorator';
import { EditBadRequestResponseDto, EditResponseDto } from './dto/edit-responses.dto';

@ApiTags('Работники')
@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @ApiOperation({summary: "Изменение данных о работнике"})
  @ApiResponse({status: 200, type: EditResponseDto})
  @ApiResponse({status: 400, type: EditBadRequestResponseDto})
  @UnauthorizedApiResponse()
  @Patch('/edit')
  update(@Headers("authorization") updateHeader: string, @Body() updateEmployeeDto: EmployeeUpdateDto) {
    return this.employeeService.update(updateHeader, updateEmployeeDto);
  }

}
