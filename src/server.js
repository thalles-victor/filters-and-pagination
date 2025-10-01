const express = require("express");
const services = require("./services"); // ajuste o caminho se necessário

const app = express();

app.get("/cars", async (request, response) => {
  try {
    // Pega os query params e converte os tipos necessários
    const filters = {
      brand: request.query.brand || undefined,
      model: request.query.model || undefined,
      year: request.query.year ? parseInt(request.query.year, 10) : undefined,
      minPrice: request.query.minPrice
        ? parseFloat(request.query.minPrice)
        : undefined,
      maxPrice: request.query.maxPrice
        ? parseFloat(request.query.maxPrice)
        : undefined,
      limit: request.query.limit ? parseInt(request.query.limit, 10) : 10,
      page: request.query.page ? parseInt(request.query.page, 10) : 1,
    };

    const result = await services.searchCars(filters);

    response.json(result);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3333, () => {
  console.log("Server is running at http://localhost:3333");
});
