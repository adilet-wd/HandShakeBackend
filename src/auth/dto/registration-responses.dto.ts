import { ApiProperty } from "@nestjs/swagger";

export class RegistationResponseDto {
    @ApiProperty({example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblR5cGUiOiJhY2Nlc3NUb2tlbiIsImVtYWlsIjoiRXhhbXBsZUBnbWFpbC5jb20iLCJpZCI6MzYsInJvbGVzIjpbeyJpZCI6MywidmFsdWUiOiJFTVBMT1lFUiIsImRlc2NyaXB0aW9uIjoi0KDQsNCx0L7RgtC-0LTQsNGC0LXQu9GMIiwiY3JlYXRlZEF0IjoiMjAyMy0xMi0xNFQyMDowMzoyNC41ODRaIiwidXBkYXRlZEF0IjoiMjAyMy0xMi0xNFQyMDowMzoyNC41ODRaIn1dLCJpYXQiOjE3MDI2MzE4MTIsImV4cCI6MTcwMjYzMTg0Mn0.RBcLJu4CrbqKs6OyLI987NjFtPdle8dQbd4chQ-j4hA", description: "AccessToken"})
    readonly accessToken: string;
    @ApiProperty({example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblR5cGUiOiJyZWZyZXNoVG9rZW4iLCJlbWFpbCI6IkV4YW1wbGVAZ21haWwuY29tIiwiaWQiOjM2LCJpYXQiOjE3MDI2MzE4MTIsImV4cCI6MTcwMzIzNjYxMn0.1wpfVHC4b8oZ2c_GQRPXp1ypGcN56-VPnGlOQL2m58E", description: "RefrehToken"})
    readonly refreshToken: string;
}

export class RegistationResponseBadRequstDto {
    @ApiProperty({example: "Не меньше 1 символа и не длинее 16. Должно быть строкой", description: "Требования к имени"})
    readonly name: string;
    @ApiProperty({example: "Не меньше 1 символа и не длинее 20. Должно быть строкой", description: "Требования к фамилии"})
    readonly username: string;
    @ApiProperty({example: "Некорректный email. Должно быть строкой", description: "Требования к почте"})
    readonly email: string;
    @ApiProperty({example: "Пароль должен содержать хотя бы 1 строчную букву, 1 заглавную букву, 1 цифры и быть не менее 8 символов длиной. Должно быть строкой", description: "Требования к паролю"})
    readonly password: string;
    @ApiProperty({example: "Должно быть либо EMPLOYEE либо EMPLOYER", description: "Требования к роли пользователя на сервисе"})
    readonly role: string;
}
export class RegistationResponseConflictDto {
    @ApiProperty({example: "Пользователь с таким email существует", description: "Доступен ли этот email для регистрации"})
    readonly message: string;
}