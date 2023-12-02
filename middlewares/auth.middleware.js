import jwt from "jsonwebtoken";
import { getById } from "../models/user.js";


const authPage = (permissions)=>{
    return (req,res)=>{
        const userRole = res.locals.user.role
        if(permissions.inludes(userRole)){
            return true
        }else{
            return false
        }
    }
}

const authCorse = (req,res,next)=>{

}

const checkUser =async(req,res,next)=>{//ulanyjyn kukileri yok bolsa funksiya nekst, bar bolsa kukileri parslayar we ulanyjy baradaky maglumatlary responsyn lokalyna yazdyryar
    const token = req.cookies.Bearer
    if (token){
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user = null
                next()
            } else{
                const user = await getById(decodedToken.id)
                res.locals.user={
                    username:user.username,
                    id:user.id,
                    role: user.user_role
                }
                next()
            }
        })
    } else{
        res.locals.user = null
        next()
    }
}
export{authPage, authCorse, checkUser}