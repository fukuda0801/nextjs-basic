import { GetServerSideProps } from "next";

type PostProps = {
  id: number;
  name: string;
  price: number;
  count: number;
};

type PostsProps = {
  posts: PostProps[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:8000/posts");
  const posts = await res.json();
  return {
    props: {
      posts,
    },
  };
};

import React from "react";

const ItemCart = ({ posts }: PostsProps) => {
  let totalPrice = 0;
  posts.forEach((post: PostProps) => {
    totalPrice += post.count * post.price;
  });
  return (
    <div>
      <h1>商品かーと</h1>
      {posts.map((post: PostProps) => {
        return (
          <div key={post.id}>
            <p>商品名: {post.name}</p>
            <p>数量：{post.count}</p>
            <p>価格: {post.price}</p>
            <p>小計: {post.count * post.price}</p>
          </div>
        );
      })}
      <p>合計金額{totalPrice}</p>
    </div>
  );
};

export default ItemCart;
