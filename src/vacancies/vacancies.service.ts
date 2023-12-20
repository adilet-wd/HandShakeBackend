import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { VacancyCreateDto } from './dto/vacancy-create.dto';
import { Vacancy } from './entities/vacancies.model';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class VacanciesService {

    constructor(@InjectModel(Vacancy) private vacancyRepository: typeof Vacancy, private userRepository: UsersService){

    }

    // Создание вакансии
    async createVacancy (createHeader: string, createVacancyDto: VacancyCreateDto) {
        try {
            const result = await this.userRepository.validateAccesToken(createHeader);
            if (result.validated) {
                const decodedToken = result.decodedToken;
                const user = await this.userRepository.getUserByEmail(decodedToken.email);
                const vacancyData = {
                    ...createVacancyDto,
                    employerId: user.employer.id,
                };
                const vacancy = await this.vacancyRepository.create(vacancyData);
                return { "message": "Вакансия успешно создана" };
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
}
