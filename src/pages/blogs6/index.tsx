type BlogProps = {
  id: number;
  title: string;
  body: string;
};

type BlogsProps = {
  blogs: BlogProps[];
};

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const blogs = await res.json();
  return {
    props: { blogs },
  };
};

const Blogs6 = ({ blogs }: BlogsProps) => {
  return (
    <div>
      <h1>ブログ一覧</h1>
      {blogs.map((blog) => {
        return (
          <div key={blog.id}>
            <p>ブログタイトル:{blog.title}</p>
            <p>ブログ内容:{blog.body}</p>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Blogs6;
