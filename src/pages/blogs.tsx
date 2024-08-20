import React from "react";

type JsonProps = {
  id: number;
  title: string;
  body: string;
};

type DataProps = {
  data: JsonProps[];
};

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data: JsonProps[] = await res.json();
  return {
    props: {
      data,
    },
  };
};

const Blogs = ({ data }: DataProps) => {
  return (
    <div>
      {data.map((post) => {
        return (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.id}</p>
            <p>{post.body}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Blogs;
