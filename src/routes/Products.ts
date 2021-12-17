import express from "express";
import { createProduct, listProducts } from "../controllers/Products";

// Definindo as rotas de produtos

const Products = express.Router();

Products.post("/products", createProduct);

Products.get("/products", listProducts);

export default Products;
