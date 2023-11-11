import express from "express";
const app = express();

/* import session from 'express-session';
app.use(session({secret: 'secret'})) */

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

// api url
const api = process.env.API_URL

// main routes
app.get('/', async (req,res)=>{
    const result = await getList()
    res.render('pages/index', {result})
})

import { router as productsRouter } from "./routers/pdoducts.js";
app.use(api+'/products', productsRouter)

import { router as categoriesRouter } from "./routers/categories.js";
app.use(api+'/categories', categoriesRouter)

import { router as usersRouter } from "./routers/users.js";
app.use(api+'/users', usersRouter)

import { router as ordersRouter } from "./routers/orders.js";
import { getList } from "./models/product.js";
app.use(api+'/orders', ordersRouter)

app.listen(3050,()=>{
    console.log('http://localhost:3050'); 
})