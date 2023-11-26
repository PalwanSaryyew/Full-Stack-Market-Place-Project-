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

        if(req.body.validation_code){
            const decodedToken = jwt.verify(req.cookie['signtoken'], process.env.JWT_SECRET);

            const nowDate = new Date();
            const differenceInMilliseconds = decodedToken.codeValidTime.getTime() - nowDate.getTime();
            const differenceInSeconds = differenceInMilliseconds / 1000;

            if (differenceInSeconds < (15 * 60)) {
                const row = await user.createRow(
                    decodedToken.username,
                    decodedToken.phoneNumber,
                    decodedToken.hashedPass,
                )
                return res.send({
                    success:true,
                    message: 'Üstünlikli ýazyldyňyz'
                })
            }else{
                return res.send({
                    success:false,
                    message: 'kodunyzyň wagty doldy täzeden registirasiýa boluň '
                })
            }
        }

        const isUserYes = await user.getRow(req.body.usrname);
        if(isUserYes) return res.send({
            success:false,
            message: 'Bu ulanyjy ady öň hem ýazgyda'
        });

        const isPhoneYes = await user.getByPhone(req.body.phone_number);
        if(isPhoneYes) return res.send({
            success:false,
            message: 'Bu Telefon öň hem ýazgyda'
        });
        const username = req.body.username;
        const phoneNumber = req.body.phone_number;
        const hashedPass = bcrypt.hashSync(req.body.password, 10);
        const codeValidTime = new Date();
        const randomLoginNumber = Math.floor(Math.random() * 99999);

        console.log(randomLoginNumber) //! häzirlikçe çonsola yazdyrýan

        const token = jwt.sign(
        {
            username,
            phoneNumber,
            hashedPass,
            codeValidTime,
        },
         process.env.JWT_SECRET,
        {expiresIn: 15 * 60})

        res.cookie('signtoken', token, {
            httpOnly: true,
            maxAge: 15 * 60
        })




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