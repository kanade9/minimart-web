import { FC, useEffect, useState } from "react";
import styles from "../index.module.css";
import { Layout } from "../../components/Layout";
import { useRouter } from "next/dist/client/router";
import { Product, getProduct } from "../../lib/product";

const ProductPage: FC = () => {
  const router = useRouter();
  const qid = router.query.id ? String(router.query.id) : null;
  const [product, setProducts] = useState<Product | null>(null);

  useEffect(() => {
    if( qid === null) return;
    getProduct(qid).then((product) => setProducts(product));
  },[qid]);
  if (product === null ) return null;

  return (
    <Layout>
      <img src={product.imageUrl} alt={`${product.name}の写真`} />
      <div>{product.name}</div>
      <div>{product.price}</div>
      <div>{product.description}</div>
    </Layout>
  );
};

export default ProductPage;
