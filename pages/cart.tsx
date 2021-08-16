import { FC, useEffect, useState } from "react";
import styles from "./index.module.css";
import { Layout } from "../../components/Layout";
import { useRouter } from "next/dist/client/router";
import { Product, getCartItems } from "../../lib/product";
import { addToCart, getItmeCountFromCart } from "../../lib/cart";

const CartPage: FC = () => {
    const router = useRouter();
    const [cartItemCount, setCartItemCount] = useState(0);
    const [cartItems, setCartItems] = useSatte(0);
    const amount = cartItemCount.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    useEffect(()=> {
      setCartItemCount(getItmeCountFromCart())
    },[]);
    useEffect(()=> {
        setCartItems(getCartItems())
    },[]);
  return (
    <Layout>
    </Layout>
  );
};

export default CartPage;
