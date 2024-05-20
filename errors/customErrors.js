import { StatusCodes } from "http-status-codes";

//this is for 404 error
export class NotFoundError extends Error{
    constructor(msg){
        super(msg)
        this.name = "NotFoundError";
        this.status = StatusCodes.NOT_FOUND
    }
}

//this is for 400 error
export class BadRequestError extends Error{
    constructor(msg){
        super(msg)
        this.name = "BadRequestError";
        this.status = StatusCodes.BAD_REQUEST
    }
}

//this is for 401 error
export class UnauthenticatedError extends Error{
    constructor(msg){
        super(msg)
        this.name = "UnauthenticatedError";
        this.status = StatusCodes.UNAUTHORIZED
    }
}

//this is 403 error
export class UnauthorizedError extends Error{
    constructor(msg){
        super(msg)
        this.name = "UnauthorizedError";
        this.status = StatusCodes.FORBIDDEN
    }
}