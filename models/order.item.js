import pool from "./db.js";

export async function getById(id){
    const [row] = await pool.query(`
        select * from order_items
        WHERE id =?;
    `,[id])
    return row[0]
};

export async function createRow(a){
    const [row] = await pool.query(`
        INSERT INTO order_items(
            quantity,
            product_id
        )
        VALUES(?,?);
    `,[a.quantity, a.product])
    return row
};

export async function deleteRow(id){
    const [row] = await pool.query(`
        DELETE FROM order_items
        WHERE id = ?;
    `,[id])
    return row
};

export async function getPrice(id){
    const [row] = await pool.query(`
        SELECT
            products.name,
            products.price,
            quantity
        FROM
            order_items
        INNER JOIN
            products
        ON
            order_items.product_id = products.id
        WHERE
            order_items.id = ?;
    `,[id])
    return row[0]
};