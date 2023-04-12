import { Produto } from "./produto";

export interface ListaProdutos {
  products: Produto[];
  message: string;
  status: number;
}
