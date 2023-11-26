import pool from "./db.js";

export async function getList(){
    const [row] = await pool.query(`
        select * from users;
    `)
    return row
};
export async function getRow(name){
    const [row] = await pool.query(`
        select * from users
        WHERE name =?;
    `,[name])
    return row[0]
};
export async function getById(id){
    const [row] = await pool.query(`
        select * from users
        WHERE id =?;
    `,[id])
    return row[0]
};
export async function getByEmail(email){
    const [row] = await pool.query(`
        select * from users
        WHERE email =?;
    `,[email])
    return row[0]
};
export async function createRow(a,b,c,d,e){
    const [row] = await pool.query(`
        INSERT INTO users(
            username,
            phone_number,
            password,
            code_date_time,
            code
        )
        VALUES(?,?,?,?,?);
    `,[a,b,c,d,e])
    return row
};
export async function countRow(id){
    const [row] = await pool.query(`
        SELECT COUNT(*) AS count
        FROM users;
    `,[id])
    return row[0]
};
export async function deleteRow(id){
    const [row] = await pool.query(`
        DELETE FROM users
        WHERE id = ?;
    `,[id])
    return row
};