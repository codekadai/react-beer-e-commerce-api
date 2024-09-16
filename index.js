import http from "http";
import products from "./data/products.js";
import stockPrice from "./data/stock-price.js";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/api/products" && req.method === "GET") {
    try {
      res.writeHead(200);
      res.end(JSON.stringify(products));
    } catch (error) {
      res.writeHead(500);
      res.end(JSON.stringify({ message: error.message }));
    }
  }

  if (req.url.startsWith("/api/stock-price/") && req.method === "GET") {
    try {
      const id = req.url.split("/").pop();
      const stockPriceProduct = stockPrice[id];
      if (!stockPriceProduct) {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "Stock and Prices not found" }));
      }
      res.writeHead(200);
      res.end(JSON.stringify(stockPriceProduct));
    } catch (error) {
      res.writeHead(500);
      res.end(JSON.stringify({ message: error.message }));
    }
  }
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
