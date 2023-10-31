import * as product from "../models/product.js";
import { getById as categoryGetById } from "../models/category.js";

export async function getProducts(req,res){
    if(req.query.categories){
        try {
            const filter = req.query.categories;
            const result = await product.getBy(`category_id IN (${filter})`);
            if(result.length === 0){
                return res.status(500).send({
                    success:false,
                    message:'Netije tapylmady'
                });
            }
            return res.render('pages/products', {result})          
        } catch (error) {
            return res.status(500).send({
                success:false,
                error: error.message
            })
        }
    }
    const result = await product.getList();
    if(result.length===0){ 
        return res.status(500).send({
            success:false,
            message: 'Haryt yok'
        });
    };
    return res.status(200).send({success:true, result})
};
export async function getProduct (req,res){
    const result = await product.getById(req.params.id);
    if(!result) return res.status(410).send({
        success:false,
        message: 'product yok'
    });
    return res.status(200).send({success: true, result})
};
export async function productCount(req,res){
    const result = await product.countRow();
    if(!result) return res.status(200).send({success:true,count:0})
    res.status(200).send({success:true,result})
};
export async function getFeaturedProducts(req,res){
    let count;
    if (req.query.count) count = req.query.count;
    else count = 10;
    const result = await product.getBy('is_featured = 1 LIMIT '+count);
    res.status(200).send({success:true,result})
};
export async function deleteProduct (req,res){
    const result = await product.getById(req.params.id);
    if(!result) {
        return res.status(410).json({success: false, message: 'onum yok'})
    } else {
        try {
            await product.deleteRow(req.params.id)
            return res.status(200).json({success: true, message: 'product has been deleted😘'})
        } catch (error) {
            return res.status(500).json({success:false, error:error.message})
        }
    }
};
export async function uploadImages (req,res){
    const result = await product.getById(req.params.id);
    if(!result) return res.status(400).send({success:false, message: 'onum tapylmady'})

    let imagesPaths = []
    const basePath = req.protocol+'://'+req.get('host')+'/public/uploads/';
    if(req.files){
        if(req.files.length>10) return res.status(400).send({success:false, message:'in kop 10 surat yuklemek mumkin'})
        const files = req.files;
        files.map(file=>{ imagesPaths.push(basePath+file.filename) })
    }else{
        return res.status(500).send({success:false, message:'suratlary yuklap bolmady'})
    }
    try {
        const row = await product.updateImage(
            imagesPaths,
            req.params.id
        )
        return res.send(row)
    } catch (error) {
        return res.status(500).send({success:false, error:error.message})
    }
};
export async function updateProduct (req,res){
    try {
        const isCategoryYes = await categoryGetById(req.body.category_id);
        if(!isCategoryYes) return res.status(400).send({success:false, message:'beyle kategoriya yok'});

        const oldProduct = await product.getById(req.params.id);
        if(!oldProduct) return res.status(400).send({success:false, message: 'onum tapylmady'})

        let image;
        if(!req.file) {
            image = oldProduct.image;
        }else{
            const basePath = req.protocol+'://'+req.get('host')+'/public/uploads/';
            image = basePath+req.file.filename;
        };

        const row = await product.updateRow(
            req.body.name,
            req.body.description,
            req.body.rich_description,
            image,
            req.body.brand,
            req.body.price,
            req.body.category_id,
            req.body.count_in_stock,
            req.params.id
        )
        return res.status(200).send({success:true, row})
    } catch (error) {
        return res.status(400).send({success:false, error:error.message})
    }
};
export async function createProduct(req,res){
    const isCategoryYes = await categoryGetById(req.body.category_id);
    if(!isCategoryYes) return res.status(400).send({success:false, message:'beyle kategoriya yok'});

    if(!req.file) return res.status(400).send({success:false, message:'surat hokmany'});
    const basePath = req.protocol+'://'+req.get('host')+'/public/uploads/';

    try {
        const result = await product.createRow(
            req.body.name,
            req.body.description,
            req.body.rich_description,
            basePath+req.file.filename,
            req.body.brand,
            req.body.price,
            req.body.category_id,
            req.body.count_in_stock
        );
        return res.status(201).send({success:true, result})
    } catch (error) {
        return res.status(400).send({success:false, error:error.message});
    }
};