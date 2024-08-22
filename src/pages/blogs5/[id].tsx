import { GetStaticPaths, GetStaticProps } from "next";

type BlogProps = {
  id: number;
  title: string;
  body: string;
};

type Blog = {
  blog: BlogProps;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const blogs: BlogProps[] = await res.json();
  const paths = blogs.map((blog) => {
    return { 
      params: {
        id: blog.id.toString()
      }
    };
  });

  return {
    paths,
    fallback: true,
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

const BlogId: React.FC<Blog> = ({ blog }) => {
  return (
    <div>
      <h2>ブログタイトル:{blog.title}</h2>
      <p>ブログ本文:{blog.body}</p>
    </div>
  );
};

export default BlogId;
