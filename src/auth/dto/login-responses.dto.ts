import { ApiProperty } from "@nestjs/swagger";
import { Token } from "typescript";

export class LoginResponseDto {
    @ApiProperty({example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblR5cGUiOiJhY2Nlc3NUb2tlbiIsImVtYWlsIjoiRXhhbXBsZUBnbWFpbC5jb20iLCJpZCI6MzYsInJvbGVzIjpbeyJpZCI6MywidmFsdWUiOiJFTVBMT1lFUiIsImRlc2NyaXB0aW9uIjoi0KDQsNCx0L7RgtC-0LTQsNGC0LXQu9GMIiwiY3JlYXRlZEF0IjoiMjAyMy0xMi0xNFQyMDowMzoyNC41ODRaIiwidXBkYXRlZEF0IjoiMjAyMy0xMi0xNFQyMDowMzoyNC41ODRaIn1dLCJpYXQiOjE3MDI2MzE4MTIsImV4cCI6MTcwMjYzMTg0Mn0.RBcLJu4CrbqKs6OyLI987NjFtPdle8dQbd4chQ-j4hA", description: "AccessToken"})
    readonly accessToken: string;
    @ApiProperty({example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblR5cGUiOiJyZWZyZXNoVG9rZW4iLCJlbWFpbCI6IkV4YW1wbGVAZ21haWwuY29tIiwiaWQiOjM2LCJpYXQiOjE3MDI2MzE4MTIsImV4cCI6MTcwMzIzNjYxMn0.1wpfVHC4b8oZ2c_GQRPXp1ypGcN56-VPnGlOQL2m58E", description: "RefrehToken"})
    readonly refreshToken: string;
}
export class LoginResponseUnauthorizedDto {
    @ApiProperty({example: "Некорректный email или пароль", description: "Правильно ли введены данные"})
    readonly message: string
}
