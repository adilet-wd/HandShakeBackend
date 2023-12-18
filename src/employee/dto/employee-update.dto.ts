import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { EnumType } from 'typescript';
import { Transform, plainToClass } from 'class-transformer';
import { IsValidBirthdate } from 'src/decorators/is-valid-birthdate.decorator';


enum EmployeeGender {
  male = 'MALE',
  female = 'FEMALE',
}

export class EmployeeUpdateDto {
    @ApiProperty({example: "Международный университет Ала-Тоо", description: "Место обучения. Не меньше 1 символа и не длинее 70."})
    @IsNotEmpty({ message: 'Место обучения не должно быть пустым' })
    @Length(1, 70, {message: "Не меньше 1 символа и не длинее 70"})
    @IsString({message: "Должно быть строкой"})
    readonly studyLocation: string;

    @ApiProperty({example: "2006-06-27", description: "Дата рождения. Формат даты YYYY-MM-DD."})
    @IsNotEmpty({ message: 'Дата рождения не должна быть пустой' })
    @IsDate({ message: 'Неправильный формат даты' })
    @Transform(({ value }) => TransformDate(value)) 
    @IsValidBirthdate({ message: 'Неправильная дата рождения' })
    readonly dateOfBirth: string; 
    
    @ApiProperty({example: "FEMALE", description: "Пол. MALE либо FEMALE."})
    @IsNotEmpty({ message: 'Пол не должен быть пустым' })
    @IsEnum(EmployeeGender , {message: "Должно быть либо MALE либо FEMALE"})
    readonly gender: EnumType;
}

function TransformDate(value: string): Date {
  return plainToClass(Date, value);
}
