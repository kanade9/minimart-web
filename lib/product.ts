import { graphqlRequest } from "./graphqlClient";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

const listProductsQuery = `
  query listProducts {
    products {
      id
      name
      description
      price
      imageUrl
    }
  }
`;

const ProductQuery = `
  query GetProduct($productid: ID){
    product(id: $productid){
      id
      name
      description
      price
      imageUrl
    }
  }
`;
export async function getProducts(): Promise<Product[]>{
  const data = await graphqlRequest({ query: ProductQuery})
  return data.products;
}

export async function listProducts(): Promise<Product[]> {
  const data = await graphqlRequest({ query: listProductsQuery });
  return data.products;
}
