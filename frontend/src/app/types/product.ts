export interface TProduct {
  id?: string;
  name: string;
  shortDescription: string;
  description: string;
  Price: number;
  discount: number;
  images: string[];
  categoryId: string;
}
