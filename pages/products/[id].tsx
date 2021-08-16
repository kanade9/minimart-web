import { FC, useEffect, useState } from "react";
import styles from "../index.module.css";
import { Layout } from "../../components/Layout";
import { useRouter } from "next/dist/client/router";
import { Product, getProduct } from "../../lib/product";
import { addToCart, getItmeCountFromCart } from "../../lib/cart";

const ProductPage: FC = () => {
  const router = useRouter();
  const qid = router.query.id ? String(router.query.id) : null;
  const [cartItemCount, setCartItemCount] = useState(0);
  const [product, setProducts] = useState<Product | null>(null);

  useEffect(()=> {
    setCartItemCount(getItmeCountFromCart())
  },[])

  useEffect(() => {
    if( qid === null) return;
    getProduct(qid).then((product) => setProducts(product));
  },[qid]);
  if (product === null ) return null;

  const AddToCart = (product:Product): void =>{
    addToCart(product);
    setCartItemCount(getItmeCountFromCart);
  }

  return (
    <Layout cartItemCount={cartItemCount}>
      <img src={product.imageUrl} alt={`${product.name}の写真`} />
      <div>{product.name}</div>
      <div>{product.price}</div>
      <div>{product.description}</div>
      <div><button onClick={()=> AddToCart(product)}> カートに追加する</button></div>
    </Layout>
  );
};

export default ProductPage;
