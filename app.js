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
app.use(authJwt()) 

// public dir
app.use(express.static('public'));

// error handler
import {errorHandler} from './helpers/error.handler.js'
app.use(errorHandler)

// api url
const api = process.env.API_URL

// main routes
import { router as productsRouter } from "./routers/pdoducts.js";
app.use(api+'/products', productsRouter)

import { router as categoriesRouter } from "./routers/categories.js";
app.use(api+'/categories', categoriesRouter)

import { router as usersRouter } from "./routers/users.js";
app.use(api+'/users', usersRouter)

import { router as ordersRouter } from "./routers/orders.js";
app.use(api+'/orders', ordersRouter)

app.listen(3050,()=>{
    console.log('app running'); 
})