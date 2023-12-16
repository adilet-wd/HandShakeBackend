import { ApiProperty } from "@nestjs/swagger";
import { Token } from "typescript";

export class RefreshAccessTokenResponse {
    @ApiProperty({example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblR5cGUiOiJhY2Nlc3NUb2tlbiIsImVtYWlsIjoiRXhhbXBsZUBnbWFpbC5jb20iLCJpZCI6MzYsInJvbGVzIjpbeyJpZCI6MywidmFsdWUiOiJFTVBMT1lFUiIsImRlc2NyaXB0aW9uIjoi0KDQsNCx0L7RgtC-0LTQsNGC0LXQu9GMIiwiY3JlYXRlZEF0IjoiMjAyMy0xMi0xNFQyMDowMzoyNC41ODRaIiwidXBkYXRlZEF0IjoiMjAyMy0xMi0xNFQyMDowMzoyNC41ODRaIn1dLCJpYXQiOjE3MDI2MzE4MTIsImV4cCI6MTcwMjYzMTg0Mn0.RBcLJu4CrbqKs6OyLI987NjFtPdle8dQbd4chQ-j4hA", description: "AccessToken"})
    readonly accessToken: string;
}

export class RefreshAccessTokenBadRequstResponse {
    @ApiProperty({example: "Неправильный refresh token", description: "Валидность токена"})
    readonly message: string;
}