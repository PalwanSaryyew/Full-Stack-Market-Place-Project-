import express from "express";
import { countUser, createUser, deleteUser, getUser, getUsers, loginUser } from "../controllers/cntrl.users.js";
export const router = express.Router();

//for only admins
router.get('/all/:business/', getUsers)

//for own
router.get('/u/:id', getUser)
router.put('/u/:id',)
router.delete('/u/:id', deleteUser)

//all users
router.get('/count', countUser)
router.get('/:business/count',)
router.post('/', createUser)
router.post('/login', loginUser)
