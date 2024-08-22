import { notDeepEqual } from "assert";
import { GetStaticPaths, GetStaticProps } from "next";
import { notFound } from "next/navigation";

type BlogProps = {
  id: number;
  title: string;
  body: string;
};

type BlogIdProps = {
  blog: BlogProps;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const blogs = await res.json();
  const paths = blogs.map((blog: BlogProps) => {
    return {
      params: { id: blog.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const blog = await res.json();
  return {
    props: { blog },
  };
};
import React from "react";

const BlogId = ({ blog }: BlogIdProps) => {
  return (
    <div>
      <p>ブログタイトル: {blog.title}</p>
      <p>ブログ本文: {blog.body}</p>
    </div>
  )
};

export default BlogId;
