import { ApiResponse } from "@nestjs/swagger";
import { MyProfileUnauthorizedResponse } from "src/users/dto/myProfle-responses.dto";

export const UnauthorizedApiResponse = () => {
    return function (target: any, key?: string, descriptor?: any) {
      ApiResponse({ status: 401, type: MyProfileUnauthorizedResponse })(target, key, descriptor);
    };
  }