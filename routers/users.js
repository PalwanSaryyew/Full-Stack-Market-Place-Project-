import express from "express";
import { countUser, createUser, deleteUser, getUser, getUsers, loginUser } from "../controllers/cntrl.users.js";
export const router = express.Router();

//for only admins
router.get('/all/:business/', getUsers)

//for own
router.get('/u/:id', getUser)

//all users
router.get('/count', countUser)
router.get('/:business/count',)

router.put('/u/:id',)
router.post('/u/:id', createUser)
router.delete('/u/:id', deleteUser)

router.post('/login', loginUser)