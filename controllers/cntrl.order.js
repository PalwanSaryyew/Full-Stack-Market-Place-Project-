import * as order from "../models/order.js";
import * as orderItem from "../models/order.item.js";
import { getById as userGetById} from "../models/user.js";

export const getOrders = async (req,res)=>{
    const result = await order.getList();
    if(result.length===0) return res.status(404).send({success: false, message: 'sargyt yok'})
    res.status(200).send({success:true, result})
};
export const getOrder = async (req, res) => {
    try {
      const result = await order.getById(req.params.id);
      if (!result) return res.status(400).send({ success: false, message: "beyle sargyt yok" });
  
      let row = [];
      await Promise.all(result.order_items.map(async (element) => {
        const value = await orderItem.getPrice(element);
        row.push(value);
        console.log(value);
      }));
  
      return res.render('pages/order', {result, row})
      // return res.json({ result, row });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  };
export const getTotalSales = async (req,res)=>{
    try {
        const totalSales = await order.getTotalSales();       
        if(!totalSales){ 
            return res.status(200).send({
                success:true,
                totalSales:{
                total_sales: 0
                }
            });
        }   
        return res.status(200).send({success:true, totalSales})
    } catch (error) {
        return res.status(500).send({success:false, error:error.message})
    }
};
export const countOrder = async(req,res)=>{
    try {
        const result = await order.countRow();
        if(!result) {
            return res.status(200).send({
                success:true,
                result:{
                    count: 0
                }
            })
        }
        return res.status(200).send({success:true, result})
        
    } catch (error) {
        return res.status(500).send({success:false, error:error.message})
    }
};
export const userOrder = async(req,res)=>{
    const result = await order.getByUser(req.params.userid);
    res.status(200).send({success:true, result})
};
export const createOrder = async (req,res)=>{
    const isUserYes = await userGetById(req.body.user);
    if(!isUserYes) return res.status(400).send({success:false, message:'yalnys ulanyjy'})
    const orderItemsIds = await Promise.all(req.body.order_items.map(async (order_item) => {
        let newOrderItem = {
            quantity: order_item.quantity,
            product: order_item.product
        }
        try {
            let result = await orderItem.createRow(newOrderItem);
            return result.insertId;           
        } catch (error) {
            return res.status(500).send({success:false, error:error.message})
        }
    }));

    const totalPrices = await Promise.all(orderItemsIds.map(async (orderItemsId)=>{ 
        const order_item = await orderItem.getPrice(orderItemsId);
        const totalPrice = order_item.price * order_item.quantity;
        return totalPrice;
    }));

    const totalPrice = totalPrices.reduce((a, b) => {
        a += b;
        return a;
      }, 0);

    try {
        const row = await order.createRow(
            orderItemsIds,
            req.body.shipping_address1,
            req.body.shipping_address2,
            req.body.city,
            req.body.zip,
            req.body.country,
            req.body.phone,
            totalPrice,
            req.body.user,
        )
        return res.status(201).json(row)
    } catch (error) {
        return res.status(500).json({success: false, error: error.message}) 
    }
};
export const updateOrder = async (req,res)=>{
    try {
        const result = await order.getById(req.params.id);
        if(!result) return res.status(400).send({success:false, message: 'beyle sargyt yok'})
        const row = await order.updateRow(
            req.body.status,
            req.params.id
        )
        return res.send(row)
    } catch (error) {
        return res.status(500).send(error.message)
    }
};
export const deleteOrder = async (req,res)=>{
    const result = await order.getById(req.params.id);
    if(!result) {
        return res.status(410).json({success: false, message: 'order not found😘'})
    } else {
        try {
            result.order_items.map(async order_item=>{
                await orderItem.deleteRow(order_item)
            })
            await order.deleteRow(req.params.id)
            return res.status(200).json({success: true, message: 'order has been deleted😘'})
        } catch (error) {
            return res.status(500).json({error})
        }
    }
}