import express from "express";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controllers/cntrl.category.js";
export const router = express.Router();

//for business
router.get('/:business', );
router.post('/:business', );
router.put('/:business/:id', );
router.delete('/:business/:id', );

router.get('/', getCategories);

//for only admins
router.post('/all', createCategory);
router.put('/all/:id', updateCategory);
router.delete('/all/:id', deleteCategory);
