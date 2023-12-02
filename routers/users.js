import express from "express";
import { countUser, createUser, deleteUser, getUser, getUsers, loginUser } from "../controllers/cntrl.users.js";
import { authPage } from "../middlewares/auth.middleware.js";
export const router = express.Router();

//for only admins
router.get('/all/:business/', async (re,res,next)=>{
   const permission = await authPage(['admin, businessperson'])
   permission ? next() :  res.status(401).send({success:false, message: 'Seniň bu salga rugsadyň ýok'})
}, getUsers)

//for own
router.get('/u/:id', getUser)
router.put('/u/:id',)
router.delete('/u/:id', deleteUser)

//all users
router.get('/count', countUser)
router.get('/:business/count',)
router.post('/', createUser)
router.post('/login', loginUser)
