import React from "react"; // reactをインポート

type BlogProps = {
  id: number;
  title: string;
  body: string;
};

type BlogsProps = {
  data: BlogProps[];
};

export const getStaticProps = async () => {
  // Next.jsのgetStaticProps関数を定義しています。
  // この関数はビルド時にサーバー側で実行され、静的なページを生成するために必要なデータをフェッチします。
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  // fetch関数を使って、https://jsonplaceholder.typicode.com/postsからデータをResponseオブジェクトとして、取得しています。
  // このデータは、ブログのサンプルデータです。awaitを使って非同期処理が完了するまで待機しています。
  const data = await res.json();
  // fetch関数を使ってhttpリクエストを送信すると、サーバーからのレスポンスがResponseオブジェクトとして返されます。
  // 通常apiからのレスポンスはjson形式で送られてきます。json形式はjavascriptで扱いやすいテキストフォーマットです。
  // res.json()とはResponseオブジェクトのメソッドの一つです。このメソッドはレスポンスのボディ部分をjson形式のデータとして解析し、
  // その結果をJavascriptのオブジェクトや配列に変換します。
  // つまり、res.json()はJSON形式のテキストデータを、Javascriptが理解できる形に変換する役割を持っています。
  // 
  return {
    props: {
      data,
    },
  };
  // getStaticProps関数はオブジェクトを返し、その中のpropsプロパティにdataを設定しています。
  // これにより、Blogsコンポーネントにpropsとしてデータが渡されます。
  // getStaticPropsが返すオブジェクトには、propsというプロパティが必ず含まれていなければなりません。
  // このpropsプロパティは、ページコンポーネントに渡されるデータを保持しています。
  // propsは、Reactコンポーネントにデータを渡すための方法です。propsは"properties"（プロパティ）の略で、
  // コンポーネント外部から内部へデータを伝えるためのオブジェクトです。
};

const Blogs = ({ data }: BlogsProps) => {
  // Blogsという名前のReactコンポーネントを定義しています。
  // このコンポーネントは、BlogsProps型のdataをpropsとして受け取ります。dataはブログエントリーの配列です。
  console.log(data);
  return (
    <div>
      {data.map((blog) => {
        return (
          <div key={blog.id}>
            <h3>ブログタイトル：{blog.title}</h3>
            <p>ブログ内容：{blog.body}</p>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Blogs;
