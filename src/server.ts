/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import express from 'express';
import './database/index'

const app = express();
import Customers from './routes/Customers'
import Products from './routes/Products'
import Orders from './routes/Orders'

app.use(express.json());

app.use(Customers)
app.use(Products)
app.use(Orders)

app.listen(3333);
