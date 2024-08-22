import { GetServerSideProps } from "next";
import React from "react";

type CartItem = {
  id: number;
  name: string;
  count: number;
  price: number;
};

type CartItemProps = {
  cartItems: CartItem[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:8000/posts");
  const cartItems: CartItem[] = await res.json();

  return {
    props: {
      cartItems,
    },
  };
};

const CartItemPage: React.FC<CartItemProps> = ({ cartItems }) => {
  let totalPrice = 0;
  cartItems.forEach((product: CartItem) => {
    totalPrice += product.price * product.count;
  });
  return (
    <>
      <div>
        {cartItems.map((item) => {
          return (
            <>
              <div>
                <h3>商品名：{item.name}</h3>
                <p>商品数：{item.count}</p>
                <p>価格：{item.price}</p>
                <p>小計：{item.count * item.price}</p>
              </div>
            </>
          );
        })}
        <p>合計金額：{totalPrice}</p>
      </div>
    </>
  );
};

export default CartItemPage;
