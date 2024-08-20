import { GetStaticProps, GetStaticPaths } from "next";
import React from "react";

type Post = {
  id: number;
  title: string;
  body: string;
};

type PostProps = {
  post: Post;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await res.json();

  const paths = posts.map((post) => {
    return {
      params: { id: post.id.toString() },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || typeof params.id !== "string") {
    return {
      notFound: true,
    };
  }

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post: Post = await res.json();
  return {
    props: { post },
  };
};

const BlogId: React.FC<PostProps> = ({ post }) => {
  return (
    <div>
      <h1>ブログ詳細</h1>
      <h3>ブログタイトル: {post.id}</h3>
      <p>ブログID{post.title}</p>
      <p>ブログ内容{post.body}</p>
    </div>
  );
};

export default BlogId;
