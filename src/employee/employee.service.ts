import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/employee-create.dto';
import { EmployeeUpdateDto } from './dto/employee-update.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class EmployeeService {
  constructor( private userService: UsersService) {
  }

  create(createEmployeeDto: CreateEmployeeDto) {
    return 'This action adds a new employee';
  }

  findAll() {
    return `This action returns all employee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

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
          return user;
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

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
