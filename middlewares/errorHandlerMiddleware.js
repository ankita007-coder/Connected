import { StatusCodes } from "http-status-codes"



const errorHandlerMiddleware = (err,req,res,next)=>{
    console.log(err)
    const statuscode = err.status || StatusCodes.INTERNAL_SERVER_ERROR
    const msg = err.message || 'something went wrong'
    return res.status(statuscode).json({msg})
}


export default errorHandlerMiddleware