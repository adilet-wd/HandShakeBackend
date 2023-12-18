import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { EmployerUpdateDto } from './dto/employer-update.dto';

@Injectable()
export class EmployersService {
  constructor( private userService: UsersService) {
  }

  // Изменение данных о работодателе по его accesToken
  async update(updateHeader: string, updateEmployerDto: EmployerUpdateDto) {
    try {
      const result = await this.userService.validateAccesToken(updateHeader);
      if (result.validated) {
        const decodedToken = result.decodedToken;
        const user = await this.userService.getUserByEmail(decodedToken.email);
        if (user.roles[0].value === "EMPLOYER") {
          await user.employer.update({
            'companyName': updateEmployerDto.companyName,
            'location': updateEmployerDto.location,
            'companyDescription': updateEmployerDto.companyDescription,
          });
          return { "message": "Данные пользователя успешно обновлены" };
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

}
