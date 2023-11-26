import express from "express";
import { createProduct, addToCart, deleteProduct, getFeaturedProducts, getProduct, getProducts, productCount, updateProduct, uploadImages } from "../controllers/cntrl.product.js";
import { upload } from "../helpers/image.upload.js";
export const router = express.Router();

router.post('/add_to_cart', addToCart);

router.get('/p/:id', getProduct);
router.get('/', getProducts);
router.get('/count', productCount);
router.get('/featured', getFeaturedProducts);
router.get('/:business');
router.get('/:business/count');
router.get('/:business/featured');

// for onlu businesses
router.put('/images/:id',  upload.array('images'), uploadImages)
router.put('/p/:id', upload.single('image'), updateProduct);
router.post('/p/:id', upload.single('image'), createProduct);
router.delete('/p/:id', deleteProduct);