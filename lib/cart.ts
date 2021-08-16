import { graphqlRequest } from "./graphqlClient";

const STORAGE_KEY = "minimart:cart"

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

type CartItem = {
    product: Product;
    quantity: number;
}
const ProductQuery = `
  query GetProduct($id: ID!){
    product(id: $id){
      id
      name
      description
      price
      imageUrl
    }
  }
`;
export async function getProduct(id:string): Promise<Product | null>{
  const data = await graphqlRequest({ query: ProductQuery, variables: {id:id}})
  return data.product;
}

export function addToCart(product:Product): void{
    const cartItems: CartItem[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    const item = cartItems.find((item) => item.product.id === product.id);

    if (item){
        item.quantity++;
        console.log(item.quantity);
    } else{
        cartItems.push({product, quantity: 1});
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));

}

export function getItmeCountFromCart():number{
    const cartItems: CartItem[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return cartItems.reduce((sum,item) => sum + item.quantity, 0);
}

export function getCartItems(): CartItem[]{
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}