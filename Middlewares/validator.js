const joi = require("joi")
const createError = require("../Utils/createError")


const registerSchema = joi.object({
    email: joi
        .string()
        .email({ tlds: false })
        .required()
        .messages({
            "string.empty": "Email is required"
        }),
    password: joi
        .string()
        .required()
        .pattern(/^[0-9a-zA-Z]{6,}$/)
        .message({
            "string.empty": "Password is required!!!",
            "string.pattern.base": "Password must contain a-z A-Z 0-9 and must be at least 6 characters.!!!"
        }),
    confirmPassword : joi
    .string()
    .required()
    .valid(joi.ref("password"))
    .messages({
        "string.empty":"confirm Password",
        "any.only": "Password and Confirm Password is not match!!!"
    })
})

const loginSchema = joi.object({
    email : joi
    .string()
    .required()
    .trim()
    .email(),
    password : joi
    .string()
    .required()
})


const validateSchema = (schema) => (req,res,next)=>{
    // code
    const {value,error} = schema.validate(req.body)
    if(error){
        return createError(400, error.details[0].message)
    }
    req.input = value
    next();
}

exports.registerValidator = validateSchema(registerSchema)
exports.loginValidator = validateSchema(loginSchema)