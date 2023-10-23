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
export async function createRow(a,b,c,d,e,f,g,h,i,j){
    const [row] = await pool.query(`
        INSERT INTO users(
            name,
            email,
            password,
            phone,
            is_admin,
            street,
            apartment,
            zip,
            city,
            country
        )
        VALUES(?,?,?,?,?,?,?,?,?,?);
    `,[a,b,c,d,e,f,g,h,i,j])
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