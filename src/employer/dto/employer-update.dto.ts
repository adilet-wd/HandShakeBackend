import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';


export class EmployerUpdateDto {

    @ApiProperty({example: "Коммерческий банк КЫРГЫЗСТАН", description: "Название компании. Не меньше 1 символа и не длинее 40."})
    @IsNotEmpty({ message: 'Название компании не должно быть пустым' })
    @Length(1, 40, {message: "Не меньше 1 символа и не длинее 40"})
    @IsString({message: "Должно быть строкой"})
    readonly companyName: string;

    @ApiProperty({example: "ул. Тоголок Молдо, 54а Бишкек, Кыргызстан, 720033", description: "Место расположения головного офиса. Не меньше 1 символа и не длинее 80."})
    @IsNotEmpty({ message: 'Место расположения головного офиса не может быть пустым' })
    @Length(1, 80, {message: "Не меньше 1 символа и не длинее 80"})
    @IsString({message: "Должно быть строкой"})
    readonly location: string;

    @ApiProperty({example: "Мы осуществляем кредитно-расчетное обслуживание более 20 тысяч предприятий, организаций и коммерческих структур, расположенных на территории Кыргызской Республики. Обладаем развитой инфраструктурой, являемся многопрофильным кредитным учреждением.", description: "Информация о компании. Не меньше 1 символа и не длинее 500."})
    @IsNotEmpty({ message: 'Информация о компании не должна быть пустой'})
    @Length(1, 500, {message: "Не меньше 1 символа и не длинее 500"})
    @IsString({message: "Должно быть строкой"})
    readonly companyDescription: string; 
}
