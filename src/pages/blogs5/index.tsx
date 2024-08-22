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
    props: {
      blogs,
    },
  };
};

const Blogs5 = ({ blogs }: BlogsProps) => {
  return (
    <div>
      {blogs.map((blog) => {
        return (
          <>
            <div key={blog.id}>
              <h2>ブログタイトル{blog.title}</h2>
              <p>ブログ本文{blog.body}</p>
              <hr />
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Blogs5;
