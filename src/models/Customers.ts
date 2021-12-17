import { Schema, model, Document } from "mongoose";

export interface Customers extends Document {
  name: string;
  email: string;
  telefone: string;
  timestamps: boolean;
}

const CustomersChema = new Schema<Customers>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    telefone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default model<Customers>("Customers", CustomersChema);
