import CustomError from "./error";
import config from "./index";
import Enum from "./enum";

class Response {
    constructor() {}

    static successResponse(data, code = 200) {
        return {
            code,
            data,
        };
    }

    static errorResponse(error) { 
        console.error(error);

        if (error instanceof CustomError) {
            return {
                code: error.code,
                error: {
                    message: error.message,
                    description: error.description,
                },
            };
        } else if (error.message.includes("E11000")) {
            return {
                code: Enum.HTTP_CODES.CONFLICT,
                error: {
                    message: "Resource already exists",
                    description: "The resource you are trying to create already exists.",
                },
            };
        }
        return {
            code: Enum.HTTP_CODES.INT_SERVER_ERROR,
            error: {
                message: "An unknown error occurred",
                description: error.message,
            },
        };
    }
}

export default Response;
