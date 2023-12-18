import { Controller, Get, Post, Body, Headers, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UnauthorizedApiResponse } from 'src/decorators/unauthorized.decorator';
import { EmployerUpdateDto } from './dto/employer-update.dto';
import { EditBadRequestResponseDto, EditResponseDto } from './dto/edit-responses.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decarator';
import { RolesGuard } from 'src/auth/roles-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { ForbiddenResponse } from 'src/dto/forbidden-response.dto';
import { ForbiddenApiResponse } from 'src/decorators/forbidden-response.decorator';


@ApiTags('Работодатели')
@Controller('employers')
export class EmployersController {
  constructor(private readonly employerService: EmployersService) {}

  @ApiOperation({summary: "Изменение данных о работодателе"})
  @ApiResponse({status: 200, type: EditResponseDto})
  @ApiResponse({status: 400, type: EditBadRequestResponseDto})
  @UnauthorizedApiResponse()
  @ForbiddenApiResponse()
  @Roles("EMPLOYER")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch('/edit')
  update(@Headers("authorization") updateHeader: string, @Body() updateEmployerDto: EmployerUpdateDto) {
    return this.employerService.update(updateHeader, updateEmployerDto);
  }
}
