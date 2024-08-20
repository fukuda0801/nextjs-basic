import { GetServerSideProps } from "next";
import React from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  count: number;
};

type ProductsProps = {
  products: Product[];
};

export const getServerSideProps: GetServerSideProps<ProductsProps> = async (
  context
) => {
  const products = await fetchProducts();
  return { props: { products } };
};

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch("http://localhost:3001/posts/");
  const data = await response.json();
  return data;
};

const Cart = ({ products }: ProductsProps) => {
  let productPrice = products.map((product) => {
    return Number(product.price) * Number(product.count);
  });

  let totalPrice = 0;
  productPrice.forEach((value) => {
    totalPrice += value;
  });
  return (
    <div>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <p>商品ID: {product.id}</p>
            <h3>商品名: {product.name}</h3>
            <p>商品価格：{product.price}</p>
            <p>個数： {product.count}</p>
            <p>小計：{productPrice[product.id - 1]}</p>
            <hr />
          </div>
        );
      })}
      <p>合計: {totalPrice}</p>
    </div>
  );
};

export default Cart;
