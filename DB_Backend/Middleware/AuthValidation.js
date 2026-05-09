
// what is the need of joi ?
/* Joi is a validation library that helps validate and sanitize user input
    It ensures that data coming from client (like username, email, password) 
    matches our expected format BEFORE it reaches our controllers/database*/
const Joi=require('joi');

const signupValidation=(req, res, next)=>{
    const schema=Joi.object({
        name:Joi.string().min(3).max(100).required(),
        email:Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400)
            .json({message:"Bad request", error})
    }
    next();
}
const loginValidation=(req, res, next)=>{
    const schema=Joi.object({
        email:Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400)
            .json({message:"Bad request", error})
    }
    next();
}

module.exports={
    signupValidation,
    loginValidation
}

