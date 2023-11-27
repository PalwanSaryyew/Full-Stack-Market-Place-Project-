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
            const decodedToken = jwt.verify(req.cookies.signtoken, process.env.JWT_SECRET);
            const validationCode = await user.getValidationCode(decodedToken.insertId)
            const codeValidTime= new Date(decodedToken.codeValidTime);
            const nowDate = new Date();
            const differenceInMilliseconds = nowDate.getTime() - codeValidTime.getTime();
            const differenceInSeconds = differenceInMilliseconds / 1000;

            if (differenceInSeconds < (15 * 60)) {
                if (validationCode.code===Number(req.body.validation_code)){
                    console.log(decodedToken.hashedPass);
                    await user.createRow(
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
                        message: 'Ýalňyş kod'
                    })
                }
            }else{
                return res.send({
                    success:false,
                    message: 'kodunyzyň wagty doldy ýa-da ýalňyş täzeden registirasiýa boluň '
                })
            }
        }else{
            const isUserYes = await user.getRow(req.body.username);
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
            console.log(req.body.password, typeof req.body.password);
            const hashedPass = bcrypt.hashSync(req.body.password, 10);
            const codeValidTime = new Date();
            const randomLoginNumber = Math.floor(Math.random() * 99999);
            const {insertId} = await user.createValidationCode(randomLoginNumber)    
            console.log(randomLoginNumber) //! häzirlikçe consola yazdyrýan
            const token = jwt.sign(
                {
                    username,
                    phoneNumber,
                    hashedPass,
                    codeValidTime,
                    insertId
                },
                process.env.JWT_SECRET,
                {expiresIn: 1000*60*15}
            )
            res.cookie('signtoken', token, {
                httpOnly: true,
                maxAge: 1000*60*15 
            })
    
            return res.send({
                success:true,
                message: 'Kod Nomeriňize Ugradyldy',
                showCodeValidationInput:true,
            })
        }


    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            success:false,
            err: error.message
        })
    }
};

// login process
export const loginUser = async (req,res)=>{
    let isUser = await user.getByUsername(req.body.user);
    if(isUser===undefined){
        isUser = await user.getByPhone(req.body.user)
        if (isUser===undefined) {
            return res.send({success:false, message: 'Beýle ulanyjy ýok'});
        }
    }
    const synchedPass = isUser.password;
    const recievedPass = req.body.password;
    const isPasswordCorrect = bcrypt.compareSync(recievedPass, synchedPass)
    if(!isPasswordCorrect){
        return res.send({success:false, message: 'Nädogry parol'});
    }
    const token = await jwt.sign(
        {
        id: isUser.id,
        isAdmin: isUser.is_admin
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d'
        }
    )
    res.locals.user=isUser.username
    res.cookie('Bearer', token,{
        httpOnly: true,
        expiresIn: 1000 * 60 * 60 * 24 * 7
    })
    res.status(200).send({success:true, message:'Login Üstünlikli'})
};

// user deletetion
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