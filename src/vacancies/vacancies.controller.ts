import { Body, Headers, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VacanciesService } from './vacancies.service';
import { VacancyCreateDto } from './dto/vacancy-create.dto';
import { User } from 'src/users/entities/users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decarator';
import { RolesGuard } from 'src/auth/roles-auth.guard';
import { ForbiddenApiResponse } from 'src/decorators/forbidden-response.decorator';
import { UnauthorizedApiResponse } from 'src/decorators/unauthorized.decorator';
import { CreateResponseDto, CreateBadRequestResponseDto } from './dto/create-responses.dto';


@ApiTags("Вакансии")
@Controller('vacancies')
export class VacanciesController {
    
    constructor(private vacanciesService: VacanciesService){}

    @ApiOperation({summary: "Создание вакансии"})
    @ApiResponse({status: 200, type: CreateResponseDto})
    @ApiResponse({status: 400, type: CreateBadRequestResponseDto})
    @UnauthorizedApiResponse()
    @ForbiddenApiResponse()
    @Roles("EMPLOYER")
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Post("/create")
    create(@Headers("authorization") createHeader: string, @Body() createVacancyDto: VacancyCreateDto){
        return this.vacanciesService.createVacancy(createHeader,createVacancyDto);
    }
}
