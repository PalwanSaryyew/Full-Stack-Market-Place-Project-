import express from "express";
const app = express();

//cookie parser
import cookieParser from "cookie-parser";
app.use(cookieParser());

// Envirement Config
import dotenv from "dotenv";
dotenv.config()

// Ähli(*) adreslerden gelen requestleri kabul et
import cors from 'cors';
app.use(cors()); app.options('*', cors())

// req body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.raw());

// http request loger
import morgan from "morgan"
//app.use(morgan('tiny'))

// method reader
/* import methodOverride from 'method-override';
app.use(methodOverride('_method', {
  methods: ['GET','POST']
})) */


// public dir
app.use(express.static('public'));

// view engine
import ejs from 'ejs';
app.set('view engine', 'ejs')

// error handler
import {errorHandler} from './helpers/error.handler.js'
app.use(errorHandler)

//auth middleware
import { checkUser } from "./middlewares/auth.middleware.js";
app.use('*', checkUser)

// main routes
import { getList } from "./models/product.js";
app.get("/", async (req, res) => {
  const products = await getList();
  res.render('pages/index', {products})
});
  

import { router as productsRouter } from "./routers/pdoducts.js";
app.use('/products', productsRouter)

import { router as categoriesRouter } from "./routers/categories.js";
app.use('/categories', categoriesRouter)

import { router as usersRouter } from "./routers/users.js";
app.use('/users', usersRouter)

import { router as businessesRouter } from "./routers/businesses.js";
app.use('/businesses', businessesRouter)

import { router as couponsRouter } from "./routers/coupons.js";
app.use('/coupons', couponsRouter)

import { router as wishlistsRouter } from "./routers/wishlists.js";
app.use('/wishlists', wishlistsRouter)

import { router as adressesRouter } from "./routers/adresses.js";
app.use('/adresses', adressesRouter)

import { router as ordersRouter } from "./routers/orders.js";
app.use('/orders', ordersRouter)

app.listen(3050,()=>{
    console.log('http://localhost:3050'); 
})