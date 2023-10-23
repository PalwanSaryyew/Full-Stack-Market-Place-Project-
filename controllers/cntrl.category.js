import * as category  from "../models/category.js";

export async function getCategories(req,res){
    const categoryList = await category.getList();
    if(categoryList.length===0){
        res.status(500).send({success: false, message: "kategoriya tapylmady"})
    }
    res.status(200).send(categoryList)
};
export async function getCategory(req,res){
    const result = await category.getById(req.params.id);
    if(!result) {
        return res.status(410).json({success: false, message: 'category not found😘'})
    }
    res.status(200).send(result)
};
export async function createCategory(req,res){
    const {name, icon, color} = req.body;
    try {
        const result = await category.createRow(name, icon, color);
        return res.status(201).send({success:true, result})    
    } catch (error) {
        return res.status(400).send({success: false, error: error.message}) 
    }
};
export async function updateCategory(req,res){
    const result = await category.getById(req.params.id);
    if(!result) return res.status(400).send({success: false, message: 'categoriya tapylmady'});
    const {name, icon, color} = req.body;
    try {
        const row = await category.updateRow(name, icon, color, result.id)
        return res.status(200).send({success:true, row})
    } catch (error) {
        return res.status(400).send({success:false, error: error.message})
    }

};
export async function deleteCategory(req,res){
    const result = await category.getById(req.params.id);
    if(!result) {
        return res.status(410).json({success: false, message: 'categoriya tapylmady'})
    } else {
        try {
            await category.deleteRow(req.params.id)
            return res.status(200).json({success: true, message: 'category pozuldy'})
        } catch (error) {
            return res.status(500).json({success:false, error: error.message})
        }
    }
};