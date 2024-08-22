type BlogProp3 = {
  id: number;
  title: string;
  body: string;
};

type BlogsProps3 = {
  blogs: BlogProp3[];
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

const Blogs3 = ({ blogs }: BlogsProps3) => {
  console.log(blogs);
  return (
    <div>
      {blogs.map((blog) => {
        return (
          <>
            <div key={blog.id}>
              <h3>ブログタイトル: {blog.title}</h3>
              <p>ブログ内容: {blog.body}</p>
              <hr />
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Blogs3;
