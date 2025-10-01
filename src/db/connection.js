// db.js
const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "postgres", // ou qualquer user que você tenha
  password: "", // vazio se trust
});

const query = (text, params) => pool.query(text, params);

module.exports = { query };
