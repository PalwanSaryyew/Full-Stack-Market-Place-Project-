import express from "express";
import { countOrder, createOrder, deleteOrder, getOrder, getOrders, getTotalSales, updateOrder, userOrder } from "../controllers/cntrl.order.js";
export const router = express.Router();

router.post('/', createOrder);
// for only admins
router.get('/', getOrders)
router.get('/count', countOrder);
router.get('/totalsales', getTotalSales);
router.get('/user/:userid', userOrder);
//for only businesses
router.get('/:business')
router.get('/:business/count', countOrder);
router.get('/:business/totalsales', getTotalSales);
// for only owner
router.get('/o/:id', getOrder)
router.put('/o/:id', updateOrder)
router.delete('/o/:id',deleteOrder)
