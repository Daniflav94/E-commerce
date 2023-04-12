export interface Produto {
  id: number;
  name: string;
  price: number;
  description: string;
  resume: string;
  picture_url: string;
  category: string;
  is_available?: boolean
}
