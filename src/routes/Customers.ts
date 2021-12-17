import express from "express";
import { createCustomer, listCostumer } from "../controllers/Customers";

// Definindo as rotas de clientes

const Customers = express.Router();

Customers.post("/customers", createCustomer);

Customers.get("/customers", listCostumer);

export default Customers;
