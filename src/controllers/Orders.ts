import { Request, Response } from "express";
import Orders from "../models/Orders";
import Products from "../models/Products";

interface NewOrderProps {
  customerId: string;
  totalPrice: number;
  products: ProductsProps[];
}

interface ProductsProps {
  _id: string;
  quantity: number;
}

const createOrder = async function (req: Request, res: Response) {
  try {
    const { customerId, products } = req.body;
    let newOrder: NewOrderProps = {
      customerId: "",
      totalPrice: 0,
      products: [],
    };

    // Verifica se o ID do produto informado existe, se existir o produto é adicionado ao pedido e o valor total é calculado
    await Promise.all(
      products.map(async (product: ProductsProps) => {
        try {
          const newOrderProduct = await Products.findById(product._id);

          if (newOrderProduct) {
            newOrder.products.push(newOrderProduct);
            newOrder.totalPrice += newOrderProduct.price * product.quantity;

            // Diminui a quantidade de produtos no estoque
            newOrderProduct.quantity -= product.quantity;
            await newOrderProduct.save();
          }
          
        } catch (error) {
          res.status(400).json("Erro ao informar o produto!");
        }
      })
    );

    newOrder.customerId = customerId;
    await Orders.create(newOrder);

    res.status(200).json(newOrder);
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

const listOrders = async function (req: Request, res: Response) {
  try {
    // Terá só 5 pedidos por página
    const page: number = req.query.page as unknown as number;
    let limit = 5;
    let skip = limit * (page - 1);

    const orders = await Orders.find()
      .populate(["products"])
      .sort({ totalPrice: "desc" })
      .limit(limit)
      .skip(skip);

    res.status(200).json(orders);
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

const listOrdersByValue = async function (req: Request, res: Response) {
  try {
    const totalPrice: number = req.query.totalPrice as unknown as number;

    // A query 'lte' busca todos os resultados menores ou iguais
    const orders = await Orders.find()
      .populate(["products"])
      .lte("totalPrice", totalPrice);

    res.status(200).json(orders);
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

const listOrdersByDates = async function (req: Request, res: Response) {
  try {
    const dateInitial: number = req.query.dateInitial as unknown as number;
    const dateFinal: number = req.query.dateFinal as unknown as number;

    // Usando as querys gte e lte, temos o resultado de uma data >= dataInicial e <= dataFinal, ambas informadas

    const orders = await Orders.find({
      updatedAt: { $gte: dateInitial, $lte: dateFinal },
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

const listOrdersByProducts = async function (req: Request, res: Response) {
  try {
    const { products } = req.body;
    let arrayProducts: string[] = [];

    products.map((product: string) => {
      arrayProducts.push(product);
    });

    const orders = await Orders.find().all("products", arrayProducts);

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error });
  }
};

export {
  createOrder,
  listOrders,
  listOrdersByValue,
  listOrdersByDates,
  listOrdersByProducts,
};
