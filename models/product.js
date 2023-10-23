import pool from "./db.js";

export async function createRow(
  name,
  description,
  rich_description,
  image,
  brand,
  price,
  category_id,
  count_in_stock
) {
  const [row] = await pool.query(
    `
        insert into products (
            name,
            description,
            rich_description,
            image,
            brand,
            price,
            category_id,
            count_in_stock)
        values (?,?,?,?,?,?,?,?)
    `,
    [
      name,
      description,
      rich_description,
      image,
      brand,
      price,
      category_id,
      count_in_stock
    ]
  );
  return row;
};
export async function getList(){
    const [row] = await pool.query(`
        select * from products;
    `)
    return row
};
export async function getById(id){
    const [row] = await pool.query(`
        select * from products
        WHERE id = ?;
    `,[id])
    return row[0]
};
export async function getBy(a){
    const [row] = await pool.query(`
        select * from products
        WHERE ${a};
    `)
    return row
};
export async function updateRow(a,b,c,d,e,f,g,h,i){
    const [row] = await pool.query(`
        UPDATE products
        SET 
            name = ?,
            description = ?,
            rich_description = ?,
            image = ?,
            brand = ?,
            price = ?,
            category_id = ?,
            count_in_stock = ?
        WHERE id = ?;
    `,[a,b,c,d,e,f,g,h,i])
    return row
};
export async function deleteRow(id){
    const [row] = await pool.query(`
        DELETE FROM products
        WHERE id = ?;
    `,[id])
    return row
};
export async function countRow(id){
    const [row] = await pool.query(`
        SELECT COUNT(*) AS count
        FROM products;
    `,[id])
    return row[0]
};
export async function updateImage(a,b){
    const [row] = await pool.query(`
        UPDATE products
        SET 
            images = JSON_ARRAY(?)
        WHERE id = ?;
    `,[a,b])
    return row
};