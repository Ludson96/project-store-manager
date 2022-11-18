const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const insert = async (products) => {
  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.sales (date)
    VALUES (NOW())`,
  );
  console.log('Eu sou o products do model: ', products);

 const promises = products.map(async (product) => {
    const columns = Object.keys(snakeize(product))
    .map((key) => `${key}`).join(', ');
    
    const placeholders = Object.keys(product)
    .map((_key) => '?').join(', ');
    
    await connection.execute(
      `INSERT INTO StoreManager.sales_products (sale_id, ${columns}) 
      VALUE (${insertId}, ${placeholders})`,
      [...Object.values(product)],
      );
 });
  await Promise.all(promises);
  return camelize(insertId);
};

const getAllSales = async () => {
    const [result] = await connection.execute(
      `SELECT sale_id, date, product_id, quantity 
      FROM StoreManager.sales_products AS sp
      LEFT JOIN StoreManager.sales AS s
      ON sp.sale_id = s.id
      ORDER BY sale_id, product_id;`,
    );
    return camelize(result);
};

const getByIdSales = async (id) => {
  const [result] = await connection.execute(
    `SELECT date, product_id, quantity 
    FROM StoreManager.sales_products AS sp
    LEFT JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id
    WHERE sale_id = ?
    ORDER BY sale_id, product_id;`,
    [id],
  );
  return camelize(result);
};

const getByIdPostSales = async (id) => {
  const [result] = await connection.execute(
    `SELECT product_id, quantity 
    FROM StoreManager.sales_products 
    WHERE sale_id = ?`,
    [id],
  );
  console.log('Eu sou o getId de models:', result);
  return camelize(result);
};

const deleteByIdSales = async (id) => connection.execute(
  `DELETE FROM StoreManager.sales
  WHERE id = ?`,
  [id],
);

const updateByIdSales = async (name, id) => connection.execute(
  `UPDATE StoreManager.sales_products
    SET name = ?
    WHERE sale_id = ?`,
  [name, id],
);

module.exports = {
  insert,
  getAllSales,
  getByIdSales,
  deleteByIdSales,
  updateByIdSales,
  getByIdPostSales,
};