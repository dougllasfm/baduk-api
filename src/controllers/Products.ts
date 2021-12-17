import { Request, Response } from "express";
import Products from "../models/Products";

const createProduct = async function (req: Request, res: Response) {
  try {
    const newProduct = await Products.create(req.body);

    res.status(200).json(newProduct);
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

const listProducts = async function (req: Request, res: Response) {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

export { createProduct, listProducts };
