import express from "express";
import { countOrder, createOrder, deleteOrder, getOrder, getOrders, getTotalSales, updateOrder, userOrder } from "../controllers/cntrl.order.js";
export const router = express.Router();

router.get('/', getOrders);
router.get('/:id', getOrder);
router.get('/get/totalsales', getTotalSales);
router.get('/get/count', countOrder);
router.get('/get/userorders/:userid', userOrder);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);