class CustomError extends Error {
    constructor(code, message, description) {
        super(`{"code": "${code}", "message": "${message}", "description": "${description}"}`);
        this.code = code;
        this.message = message;  // Yazım hatasını düzelttik
        this.description = description;
    }
}

export default CustomError;