import { GetStaticPaths, GetStaticProps } from "next";

type BlogProp = {
  id: number;
  title: string;
  body: string;
};

type BlogsProp = {
  blog: BlogProp;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const blogs :BlogProp[] = await res.json();
  const paths = blogs.map((blog) => {
    return {
      params: {
        id: blog.id.toString()
      },
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
  const blog: BlogProp = await res.json();
  return {
    props: { blog },
  };
};

const BlogsId: React.FC<BlogsProp> = ({ blog }) => {
  return (
    <div>
      <h1>ブログ記事</h1>
      <h3>ブログタイトル:{blog.title}</h3>
      <p>{blog.id}</p>
      <p>ブログ内容:{blog.body}</p>
    </div>
  );
};

export default BlogsId;
