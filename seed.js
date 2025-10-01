// runMigrations.js
const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "", // vazio se trust
});

async function insertRandomCars() {
  const sql = `
    INSERT INTO cars (brand, model, year, price)
    SELECT
        (ARRAY['Ford','Chevrolet','Toyota','Honda','BMW','Audi','Nissan','Hyundai','Kia','Volkswagen'])[floor(random()*10 + 1)] AS brand,
        (ARRAY['Model A','Model B','Model C','Model D','Model E','Model F','Model G'])[floor(random()*7 + 1)] AS model,
        (floor(random() * 31 + 1990))::int AS year,
        round((random() * 90000 + 10000)::numeric, 2) AS price
    FROM generate_series(1,10000);
  `;

  try {
    await client.connect();
    await client.query(sql);
    console.log("Inserindo 10000 carros na tabela");
  } catch (err) {
    console.error("Erro ao inserir carros:", err);
  } finally {
    await client.end();
    console.log("Conexão encerrada, carros inseridos com sucesso");
  }
}

// Executa a função
insertRandomCars();
