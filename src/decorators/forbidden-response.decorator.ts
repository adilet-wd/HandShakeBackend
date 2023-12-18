import { ApiResponse } from "@nestjs/swagger";
import { ForbiddenResponse } from "src/dto/forbidden-response.dto";

export const ForbiddenApiResponse = () => {
    return function (target: any, key?: string, descriptor?: any) {
      ApiResponse({ status: 403, type: ForbiddenResponse })(target, key, descriptor);
    };
  }