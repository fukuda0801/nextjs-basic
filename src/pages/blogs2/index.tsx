import { GetStaticProps } from "next";
import React from "react";

type BlogProps = {
  id: number;
  title: string;
  body: string;
}

type BlogsProps = {
  blogs: BlogProps[];
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const blogs = await res.json();

  return {
    props: {
      blogs,
    },
  };
};

const Blogs2 = ({blogs}: BlogsProps) => {
  return (
    <>
      <div>
        <h2>記事一覧</h2>
        {blogs.map((blog) => {
          return (
            <div key={blog.id}>
              <h3>{blog.title}</h3>
              <p>{blog.body}</p>
              <hr />
            </div>
          )
        })}
      </div>
    </>
  )
};

export default Blogs2;
