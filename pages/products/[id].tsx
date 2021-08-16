import { FC, useEffect, useState } from "react";
import styles from "../index.module.css";
import { Layout } from "../../components/Layout";
import { useRouter } from "next/dist/client/router";
import { Product, getProducts } from "../../lib/product";
import { graphqlRequest } from "../../lib/graphqlClient";

async function GetProductFunction(productid:String): Promise<Product> {
  alert(productid);
  const productquery = `
  query GetProduct($productid: ID){
      product(id: $productid){
          id
          name
          price
          description
          imageUrl
      }
  }`;
  const productdata = await graphqlRequest({query: productquery, variables: {ID:productid}});
  return productdata;
}

const ProductPage: FC = () => {
  const router = useRouter();
  const qid = router.query.id as string;
  const [product, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const product = await GetProductFunction(qid);
      setProducts(product);
    })();
    getProducts().then((product) => setProduct(products));
    // listProducts().then((products) => setProducts(products));
  },[qid]);

  return (
    <Layout>
      <img className={styles.image} src={product.imageUrl} alt={`${product.name}の写真`} />
      <div>{product.name}</div>
      <div>{product.price}</div>
      <div>{product.description}</div>
    </Layout>
  );
};

export default ProductPage;
