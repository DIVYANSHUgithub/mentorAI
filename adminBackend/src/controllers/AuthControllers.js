import bcrypt from 'bcrypt'
import jwt from'jsonwebtoken';
import UserModel from '../models/user.js';


export const signup=async(req,res)=>{
    // iske pahle humko server-side validation likhna padega, Why?
    try{
        const { name, email, password}=req.body;
        const user=await UserModel.findOne({email});
        if(user){
            return res.status(409)
                .json({message:'User is already exist, you can login', success: false});
        }
        const userModel=new UserModel({name, email, password});
        userModel.password=await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(200)
            .json({message:'SignedUp successfully',
                success:true

            })
    }catch(err){
        console.log("error is : ", err)
        res.status(500)

            .json({message:"Internal Server Error",
                success:false
            })
 
    }
}
export const login=async(req,res)=>{
    // iske pahle humko server-side validation likhna padega, Why?
    try{
        const {email, password}=req.body;
        
        const user=await UserModel.findOne({email});
        console.log(user)
        console.log("user is:",user)
        const errMessage='Auth failed email or password is wrong';
        if(!user){
            return res.status(403)
                .json({message:errMessage, success: false});
        }
        const isPassEqual=await bcrypt.compare(password,user.password);
        console.log("is password equal? : ", isPassEqual)
        if(!isPassEqual)
        {
            console.log("password is not equal")
            return res.status(403)
                .json({message:errMessage, success: false});
        }
        const jwtToken=jwt.sign(
            {email:user.email, _id:user.id},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}

        )
        res.status(200)
            .json({message:'Login successfully',
                success:true,
                jwtToken,
                email,
                name: user.name,
                // the change made by me is from this line
                user

            })
    }catch(err){
        res.status(500)
            .json({message:"Internal Server Error",
                success:false
            })
    }
}

const logout=async(req,res)=>{
    res.clearCookie('token');
    res.status(200)
        .json({message:'Logged out successfully',
            success:true
        })
}


