const { promisify } = require('util');
const mysql = require('mysql2');
const dbconfig = require('../../config/db');

async function addCategory(categoryName) {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    await query('INSERT INTO category (name) VALUES (?)', [categoryName]);
    con.end((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

async function removeCategory(categoryName) {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    await query('DELETE FROM category WHERE name = ?', [categoryName]);
    con.end((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

async function addMenuItem(itemName, categoryId, price, availability) {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    await query('INSERT INTO menu (name, category_id, price, availability) VALUES (?,?,?,?)', [itemName, categoryId, price, availability]);
    con.end((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

async function changeItemPrice(itemName, newPrice) {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    await query('UPDATE menu SET price = ? WHERE name = ?', [newPrice, itemName]);
    con.end((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

async function removeMenuItem(itemName) {
  try {
    const con = mysql.createConnection(dbconfig);
    const query = promisify(con.query).bind(con);
    con.connect((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
    await query('DELETE FROM menu WHERE name = ?', [itemName]);
    con.end((err) => {
      if (err) {
        console.error('Error:', err);
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = {
  addCategory,
  removeCategory,
  addMenuItem,
  changeItemPrice,
  removeMenuItem,
};
