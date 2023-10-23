import dotenv from 'dotenv'
dotenv.config()
import mysql from "mysql2";

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATAB
}).promise()

export default pool