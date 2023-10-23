import pool from './db.js';

export async function getList(){
    const [row] = await pool.query(`
        select * from categories;
    `)
    return row
};
export async function getById(id){
    const [row] = await pool.query(`
        select * from categories
        where id = ?;
    `,[id])
    return row[0]
};
export async function createRow(name, icon, color){
    const [row] = await pool.query(`
        insert into categories (name, icon, color)
        values (?,?,?)
    `,[name, icon, color])
    return row
};
export async function deleteRow(id){
    const [row] = await pool.query(`
        DELETE FROM categories
        WHERE id = ?;
    `,[id])
    return row
};
export async function updateRow(name, icon, color, id){
    const [row] = await pool.query(`
        UPDATE categories
            SET name = ?,
            icon = ?,
            color = ?
        WHERE id = ?;
    `,[name, icon, color, id])
    return row
};