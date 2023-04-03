import { Produto } from "./produto";
import { Produtos } from "./produtos";

export interface Sacola {
  id: number;
  produtos: Produtos[]
  valorTotal: number;
}
