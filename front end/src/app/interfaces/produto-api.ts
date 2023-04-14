import { Produto } from "./produto";

export interface ProdutoAPI {
  products: Produto;
  message: string;
  status: number;
}
