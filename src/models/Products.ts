import { Schema, model, Document } from 'mongoose';

export interface Products extends Document {
  push: any;
  name: string;
  price: number;
  quantity: number;
  timestamps: boolean;
}

const ProductsChema = new Schema<Products>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export default model<Products>('Products', ProductsChema);
