import pool from "./db.js";

export async function getList(){
    const [row] = await pool.query(`
        select * from orders;
    `)
    return row
};
export async function getById(id){
    const [row] = await pool.query(`
        select * from orders
        WHERE id =?;
    `,[id])
    return row[0]
};
export async function getByUser(id){
    const [row] = await pool.query(`
        select * from orders
        WHERE user = ?;
    `,[id])
    return row
};
export async function createRow(a,b,c,d,e,f,g,h,i){
    const row = await pool.query(`
        INSERT INTO orders(
            order_items,
            shipping_address1,
            shipping_address2,
            city,
            zip,
            country,
            phone,
            total_price,
            user
        )
        VALUES(JSON_ARRAY(?),?,?,?,?,?,?,?,?);
    `,[a,b,c,d,e,f,g,h,i])
    return row[0];
};
export async function updateRow(a, b){
    const [row] = await pool.query(`
        UPDATE orders
        SET status = ?
        WHERE id = ?;
    `,[a, b])
    return row
};
export async function deleteRow(id){
    const [row] = await pool.query(`
        DELETE FROM orders
        WHERE id = ?;
    `,[id])
    return row
};
export async function getTotalSales(id){
    const [row] = await pool.query(`
        SELECT
            SUM(total_price) AS total_sales
        FROM
            orders;
    `,[id])
    return row[0]
};
export async function countRow(){
    const [row] = await pool.query(`
        SELECT COUNT(*) AS count
        FROM orders;
    `)
    return row[0]
};