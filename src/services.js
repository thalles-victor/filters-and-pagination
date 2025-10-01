const { query } = require("./db/connection.js"); // ajuste o caminho para seu Pool

async function searchCars(filters) {
  const {
    brand,
    model,
    year,
    minPrice,
    maxPrice,
    limit = 10,
    page = 1,
  } = filters;

  const offset = (page - 1) * limit;

  const sql = `
    SELECT *
    FROM cars
    WHERE 1=1
      AND ($1::text IS NULL OR brand ILIKE '%' || $1 || '%')
      AND ($2::text IS NULL OR model ILIKE '%' || $2 || '%')
      AND ($3::int IS NULL OR year = $3)
      AND ($4::numeric IS NULL OR price >= $4)
      AND ($5::numeric IS NULL OR price <= $5)
    ORDER BY created_at DESC
    LIMIT $6 OFFSET $7
  `;

  const params = [
    brand || null,
    model || null,
    year || null,
    minPrice || null,
    maxPrice || null,
    limit,
    offset,
  ];

  const result = await query(sql, params);

  // contar total para meta da paginação
  const countResult = await query(
    `
    SELECT COUNT(*) AS total
    FROM cars
    WHERE 1=1
      AND ($1::text IS NULL OR brand ILIKE '%' || $1 || '%')
      AND ($2::text IS NULL OR model ILIKE '%' || $2 || '%')
      AND ($3::int IS NULL OR year = $3)
      AND ($4::numeric IS NULL OR price >= $4)
      AND ($5::numeric IS NULL OR price <= $5)
    `,
    [
      brand || null,
      model || null,
      year || null,
      minPrice || null,
      maxPrice || null,
    ]
  );

  const total = parseInt(countResult.rows[0].total, 10);
  const totalPages = Math.ceil(total / limit);

  return {
    data: result.rows,
    meta: {
      total,
      totalPages,
      currentPage: page,
      limit,
    },
  };
}

module.exports = { searchCars };
