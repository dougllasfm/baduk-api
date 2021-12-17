import { Schema, model } from "mongoose";

import { Customers } from "./Customers";
import { Products } from "./Products";

interface Orders {
  name: string;
  customerId: Customers["_id"];
  totalPrice: number;
  products: Products;
  timestamps: boolean;
}

const OrdersChema = new Schema<Orders>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customers",
      required: true,
    },
    totalPrice: {
      type: Number,
    },
    products: [{
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    }],
  },
  { timestamps: true }
);

export default model<Orders>("Orders", OrdersChema);
