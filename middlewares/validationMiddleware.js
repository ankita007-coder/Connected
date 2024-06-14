import { body, validationResult } from "express-validator"
import { BadRequestError } from "../errors/customErrors.js"
import User from "../models/User.js"



const validationMiddleware = (validateValues)=>{
    return [
        validateValues,
        (req,res,next)=>{
            //console.log(req)
            const errors = validationResult(req)
            //console.log(errors)
            if (!errors.isEmpty()){
                const errorMessages = errors.array().map(error => error.msg);
                throw new BadRequestError(errorMessages);
            }

            next();
        }

    ]
}

export const validateRegister = validationMiddleware([
    body('name').notEmpty().withMessage('Name is required')
                .isLength({min: 3}).withMessage('Name must be at least 3 characters'),
    body('email').notEmpty().withMessage('Email must not be empty')
                 .isEmail().withMessage('Enter a valid email address')
                 .custom(async(email)=>{
                    const user = await User.findOne({email: email});
                    if (user){
                        throw new BadRequestError('User already exists')
                    }
                 }),
    body('password').notEmpty().withMessage('Password is required')
                    .isLength({min: 8}).withMessage('Password must be at least 8 characters')
])

export const validateLogin= validationMiddleware([
    body('email').notEmpty().withMessage('Email must not be empty')
                 .isEmail().withMessage('Enter a valid email address'),
    body('password').notEmpty().withMessage('Password is required')
                    .isLength({min: 8}).withMessage('Password must be at least 8 characters')
])

export const validateComment= validationMiddleware([
    body('content').notEmpty().withMessage('Please enter a comment')
])

export const validateAddGroup = validationMiddleware([
    body('name').notEmpty().withMessage('Enter a group name')
])