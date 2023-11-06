import express from "express";
import { createProduct, cart, addToCart, deleteProduct, getFeaturedProducts, getProduct, getProducts, productCount, updateProduct, uploadImages } from "../controllers/cntrl.product.js";
import { upload } from "../helpers/image.upload.js";
export const router = express.Router();

router.post('/add_to_cart', addToCart);
router.get('/cart', cart)

router.post('/', upload.single('image'), createProduct);
router.put('/:id', upload.single('image'), updateProduct);
router.put('/gallery-images/:id',  upload.array('images'), uploadImages)
router.delete('/:id', deleteProduct);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.get('/get/count', productCount);
router.get('/get/featured/', getFeaturedProducts);