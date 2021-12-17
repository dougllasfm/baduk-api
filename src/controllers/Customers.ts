import { Request, Response } from 'express';
import Customers from '../models/Customers';

const createCustomer = async function(req: Request, res: Response) {
  const { email } = req.body;

  try {
    // Não dá para criar usuários com o mesmo email
    if (await Customers.findOne({ email })) { return res.status(400).send({ error: 'Esse email já existe' }); }

    const newCustomer = await Customers.create(req.body);

    res.status(200).json(newCustomer);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'erro' });
  }
};

const listCostumer = async function(req: Request, res: Response) {
  try {
    const customers = await Customers.find()
    res.status(200).json(customers)
  } catch (error) {
    res.status(400).send({ error: error });
  }
}

export { createCustomer, listCostumer }