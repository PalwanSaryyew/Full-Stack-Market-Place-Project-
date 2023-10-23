import express from "express";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controllers/cntrl.category.js";
export const router = express.Router();

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);
