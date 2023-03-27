import { Produto } from "./produto";

export interface Sacola {
  id: number;
  produto: Produto;
  quantidade: number;
  selecionado?: boolean;
}
