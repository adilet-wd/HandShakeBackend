import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { VacancyCreateDto } from './dto/vacancy-create.dto';
import { Vacancy } from './entities/vacancies.model';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';
import { EmployeesService } from 'src/employee/employees.service';
import { EmployersService } from 'src/employer/employers.service';
import { VacancySubscribeDto } from './dto/vacancy-subscribe.dto';
import { ApplicatedVacancy } from './entities/applicated_vacancies.model';
import { where } from 'sequelize';

@Injectable()
export class VacanciesService {

    constructor(@InjectModel(Vacancy) private vacancyRepository: typeof Vacancy,@InjectModel(ApplicatedVacancy) private applicatedVacancyRepository: typeof ApplicatedVacancy , private userService: UsersService, private employeeService: EmployeesService, private employerService: EmployersService){

    }

    // Создание вакансии
    async createVacancy (createHeader: string, createVacancyDto: VacancyCreateDto) {
        try {
            const result = await this.userService.validateAccesToken(createHeader);
            if (result.validated) {
                const decodedToken = result.decodedToken;
                const employer = await this.employerService.getEmployerByEmail(decodedToken.email);
                const vacancyData = {
                    ...createVacancyDto,
                    employerId: employer.id,
                };
                const vacancy = await this.vacancyRepository.create(vacancyData);
                return { "message": "Вакансия успешно создана",
                "vacancyID": vacancy.id };
            } else {
                throw new HttpException(
                    {status: HttpStatus.BAD_REQUEST, message: 'Недействительный access token',}
                    , HttpStatus.BAD_REQUEST);
            }
        } catch(error) {
            throw new HttpException(
                    {status: HttpStatus.BAD_REQUEST, message: `${error}`,}
                    , HttpStatus.BAD_REQUEST);
        }
    }

    // Подписка к вакансии
    async subscribeToVacancy (createHeader: string, subscribeVacancyDto: VacancySubscribeDto) {
        const result = await this.userService.validateAccesToken(createHeader);
        if (result.validated) {
            const decodedToken = result.decodedToken;
            const employee = await this.employeeService.getEmployeeByEmail(decodedToken.email);
            const vacancy = await this.getVacancy(subscribeVacancyDto.id);
            if (!vacancy){
                throw new HttpException(
                    {status: HttpStatus.NOT_ACCEPTABLE, message: 'Вакансия не найдена',}
                    , HttpStatus.NOT_ACCEPTABLE);
            }
            const applicatedVacancy = await this.getApplicatedVacancy(subscribeVacancyDto.id);
            if (applicatedVacancy) {
                throw new ConflictException("Вы уже подписаны на эту вакансию")
            } else {
                const vacancyData = {
                    vacancyId: subscribeVacancyDto.id,
                    employeeId: employee.id,
                };
                const vacancy = await this.applicatedVacancyRepository.create(vacancyData);
                return {"message": "Вы успешно подписались на вакансию"};
            }
        } else {
            throw new HttpException(
                {status: HttpStatus.BAD_REQUEST, message: 'Недействительный access token',}
                , HttpStatus.BAD_REQUEST);
        }
    }

    async getVacancy(id: number) {
        const vacancy = await this.vacancyRepository.findByPk(id,{include: [{all: true}]});
        return vacancy; 
    }

    async getApplicatedVacancy(id: number) {
        const vacancy = await this.applicatedVacancyRepository.findOne({where: {vacancyId : id}, include: [{all: true}]});
        return vacancy; 
    }
}
