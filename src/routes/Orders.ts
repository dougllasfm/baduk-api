import express from "express";
import { createOrder, listOrders, listOrdersByValue, listOrdersByDates, listOrdersByProducts } from "../controllers/Orders";

// Definindo as rotas de pedidos

const Orders = express.Router();

Orders.post("/orders", createOrder);

Orders.get("/orders", listOrders);

Orders.get("/ordersByValue", listOrdersByValue)

Orders.get("/ordersByDates", listOrdersByDates)

Orders.get("/ordersByProducts", listOrdersByProducts)

export default Orders;
