import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEmployeeDto } from './employee-create.dto';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EnumType } from 'typescript';
import { Transform, plainToClass } from 'class-transformer';
import { IsValidBirthdate } from 'src/decorators/is-valid-birthdate.decorator';


enum EmployeeGender {
    male = 'MALE',
    female = 'FEMALE',
    // Добавьте другие роли, если они есть
  }

export class EmployeeUpdateDto {
    @ApiProperty({example: "Международный университет Ала-Тоо", description: "Место обучения."})
    @IsNotEmpty({ message: 'Место обучения не должно быть пустым' })
    @IsString({message: "Должно быть строкой"})
    readonly studyLocation: string;
    @ApiProperty({example: "2006-06-27", description: "Дата рождения"})
    @IsNotEmpty({ message: 'Дата рождения не должна быть пустой' })
    @IsDate({ message: 'Неправильный формат даты' })
    @Transform(({ value }) => TransformDate(value)) 
    @IsValidBirthdate({ message: 'Неправильная дата рождения' })
    readonly dateOfBirth: string; 
    @ApiProperty({example: "FEMALE", description: "Пол"})
    @IsNotEmpty({ message: 'Пол не должен быть пустым' })
    @IsEnum(EmployeeGender , {message: "Должно быть либо MALE либо FEMALE"})
    readonly gender: EnumType;
}

function TransformDate(value: string): Date {
  return plainToClass(Date, value);
}
