import * as user from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const getUsers = async (req,res)=>{
    const result = await user.getList();
    if(result.length === 0) return res.status(500).send({
        success: false,
        message: 'abonent yok'
    });
    return res.status(200).send({
        success:true,
        result
    })
};
export const getUser =  async (req,res)=>{
    const result = await user.getById(req.params.id);
    if(!result) return res.status(500).json({
        success: false,
        message: 'beyle ulanyjy yok'
    });
    return res.status(200).send(result)
};
export const countUser = async (req,res)=>{
    const result = await user.countRow();
    if(!result) return res.status(200).send({success:true,count:0})
    res.status(200).send({success:true,result})
};
export const createUser = async (req,res)=>{

    if(req.body.is_admin==true){
        if (!req.body.phone || req.body.phone === ""){
            return res.status(400).send({
                success:false,
                message: 'telefon hokmany'
            })
        }
    };

    try {
        const isUserYes = await user.getRow(req.body.name);
        if(isUserYes) return res.status(400).send({
            success:false,
            message: 'Bu UserName onden bar'
        });

        const isEmailYes = await user.getByEmail(req.body.email);
        if(isEmailYes) return res.status(400).send({
            success:false,
            message: 'Bu Email onden bar'
        });
      
        const hashedPass = bcrypt.hashSync(req.body.password, 10);
        const row = await user.createRow(
            req.body.name,
            req.body.email,
            hashedPass,
            req.body.phone,
            req.body.is_admin,
            req.body.street,
            req.body.apartment,
            req.body.zip,
            req.body.city,
            req.body.country
        )
        return res.status(201).send({
            success:true,
            row
        })

    } catch (error) {
        return res.status(500).send({
            success:false,
            err: error.message
        })
    }
};
export const loginUser = async (req,res)=>{
    const result = await user.getByEmail(req.body.user);
    if(!result) return res.status(400).send({success:false, message: 'yalnys email'});
    if(!bcrypt.compareSync(req.body.password, result.password)) return res.status(400).send({success:false, message: 'yalnys parol'});
    const token = await jwt.sign(
        {
        id: result.id,
        isAdmin: result.is_admin
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d'
        }
    )
    res.cookie('jwt', token, { //ulajyn girisi üstünklükli bolan ýagdaýynda kukilerijw ady bilen kliende ugratyar
        httpOnly: true,
        maxAge: 1000*60*60*168
    })
    res.status(200).send({success:true, token})
};
export const deleteUser = async (req,res)=>{
    const result = await user.getById(req.params.id);
    if(!result) {
        return res.status(410).json({success: false, message: 'ulanyjy indi yok'})
    } else {
        try {
            await user.deleteRow(req.params.id)
            return res.status(200).json({success: true, message: 'ulanyjy pozuldy'})
        } catch (error) {
            return res.status(500).json({success:false, error: error.message})
        }
    }
};