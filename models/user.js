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
        WHERE username =?;
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
export async function createRow(a,b,c,d){
    const [row] = await pool.query(`
        INSERT INTO users(
            username,
            phone_number,
            password,
            user_role
        )
        VALUES(?,?,?,?);
    `,[a,b,c,d])
    return row
};
export async function createValidationCode(a){
    const [row] = await pool.query(`
        INSERT INTO validation_codes(
            code
        )
        VALUES(?);
    `,[a])
    return row
};
export async function getValidationCode(id){
    const [row] = await pool.query(`
        select * from validation_codes
        WHERE id =?;
    `,[id])
    return row[0]
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
export async function getByPhone(phone_number){
    const [row] = await pool.query(`
        SELECT * FROM users
        WHERE phone_number = ?;
    `,[phone_number])
    return row[0]
};
export async function getByUsername(username){
    const [row] = await pool.query(`
        SELECT * FROM users
        WHERE username = ?;
    `,[username])
    return row[0]
};