import express from "express";
const app = express();

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
app.use(morgan('tiny'))

// token validator
import { authJwt } from "./helpers/jwt.js";
//!app.use(authJwt()) 

// public dir
app.use(express.static('public'));

// view engine
import ejs from 'ejs';
app.set('view engine', 'ejs')

// error handler
import {errorHandler} from './helpers/error.handler.js'
app.use(errorHandler)

// main routes
app.get('/', async (req,res)=>{
    const result = await getList()
    res.render('pages/index', {result})
})

import { router as productsRouter } from "./routers/pdoducts.js";
app.use('/products', productsRouter)

import { router as categoriesRouter } from "./routers/categories.js";
app.use('/categories', categoriesRouter)

import { router as usersRouter } from "./routers/users.js";
app.use('/users', usersRouter)

import { router as ordersRouter } from "./routers/orders.js";
import { getList } from "./models/product.js";
app.use('/orders', ordersRouter)

app.listen(3050,()=>{
    console.log('http://localhost:3050'); 
})