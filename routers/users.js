import express from "express";
import { countUser, createUser, deleteUser, getUser, getUsers, loginUser } from "../controllers/cntrl.users.js";
export const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.get('/get/count', countUser);
router.post('/', createUser);
router.post('/login', loginUser);
router.delete('/:id', deleteUser);