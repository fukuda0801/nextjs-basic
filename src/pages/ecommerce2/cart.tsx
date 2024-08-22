import React from "react";
import { GetServerSideProps } from "next";

type CartItem = {
  id: number;
  name: string;
  count: number;
  price: number;
};

type CartProps = {
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

const CartPage: React.FC<CartProps> = ({cartItems}) => {
  let totalPrice = 0;
  cartItems.forEach((value) => {
    totalPrice += value.price * value.count
  })

  return (
    <div>
      <h1>ショッピングカーと</h1>
        {cartItems.map((item) => {
          return (
            <ul key={item.id}>
              <li>{item.id}</li>
              <li>商品名：{item.name}</li>
              <li>購入数：{item.count}</li>
              <li>値段：{item.price}</li>
              <li>小計：{item.price * item.count}</li>
            </ul>
          )
        })}
      <p>合計金額:{totalPrice}</p>
    </div>
  )
}

export default CartPage;
