import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EmployeeUpdateDto } from './dto/employee-update.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Employee } from './entities/employees.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class EmployeesService {
  constructor( @InjectModel(Employee) private employeeRepository: typeof Employee, private userService: UsersService) {
  }

  // Изменение данных о работнике по его accesToken
  async update(updateHeader: string, updateEmployeeDto: EmployeeUpdateDto) {
    try {
      const result = await this.userService.validateAccesToken(updateHeader);
      if (result.validated) {
        const decodedToken = result.decodedToken;
        const user = await this.userService.getUserByEmail(decodedToken.email);
        if (user.roles[0].value === "EMPLOYEE") {
          await user.employee.update({
            'studyLocation': updateEmployeeDto.studyLocation,
            'dateOfBirth': new Date(updateEmployeeDto.dateOfBirth),
            'gender': updateEmployeeDto.gender,
          });
          return {"message": "Данные пользователя успешно обновлены"};
        } else {
          throw new HttpException(
              {status: HttpStatus.BAD_REQUEST, message: 'Недействительный access token',}
              , HttpStatus.BAD_REQUEST);
        }
      } else {
        throw new HttpException(
            {status: HttpStatus.BAD_REQUEST, message: 'Недействительный access token',}
            , HttpStatus.BAD_REQUEST);
      }
    } catch(error) {
        throw new HttpException(
                {status: HttpStatus.BAD_REQUEST, message: `Недействительный access token`,}
                , HttpStatus.BAD_REQUEST);
    }
  }

  // Получение работника по его почте(уникальная почта)
    // Возвращает работодателя со всеми его связями
    async getEmployeeByEmail(email: string) {
      const user = await this.userService.getUserByEmail(email);
      const employee = await this.employeeRepository.findOne({
          where: { userId: user.id },
          include:{ all: true }, 
      });
      return employee;
    }
}
