import { GetServerSideProps } from "next";
import React from "react";

type ItemProps = {
  id: string;
  name: string;
  price: number;
  count: number;
};

type ItemsProps = {
  items: ItemProps[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:8000/posts");
  const items = await res.json();
  return {
    props: { items },
  };
};

const Cart = ({ items }: ItemsProps) => {
  let totalPrice = 0;
  items.forEach((item) => {
    totalPrice += item.price * item.count;
  });

  return (
    <div>
      <h1>商品カート</h1>
      {items.map((item) => {
        return (
          <div key={item.id}>
            <p>商品名:{item.name}</p>
            <p>商品価格:{item.price}</p>
            <p>商品個数:{item.count}</p>
            <p>小計: {item.count * item.price}</p>
          </div>
        );
      })}
      <p>合計金額{totalPrice}</p>
    </div>
  );
};

export default Cart;
