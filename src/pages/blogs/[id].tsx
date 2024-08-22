import { GetStaticPaths, GetStaticProps } from "next";
// GetStaticPathsとGetStaticPropsをnextからインポートしています。GetStaticPathsは動的ルートを生成するために使用され、
// GetStaticPropsはそのルートに基づいてデータを取得するために使用されます
import React from "react";
// Reactをインポートしています。これにより、Reactコンポーネントを作成するための機能が使用可能になります。
type BlogProp = {
  id: number;
  title: string;
  body: string;
};

type BlogsProps = {
  blog: BlogProp;
};

export const getStaticPaths: GetStaticPaths = async () => {
  // getStaticPathsという非同期関数を定義しています。この関数は、静的生成のために事前に生成されるすべてのパスを指定します。
  // 型注釈GetStaticPathsを使用することで、TypeScriptにおける型チェックが行われます。
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  // fetchを使って外部APIからブログポストのデータをResponseオブジェクトとして取得しています。
  // awaitを使用して非同期処理が完了するのを待っています。
  const blogs: BlogProp[] = await res.json();
  // 取得したレスポンスをJSON形式からJavaScriptオブジェクトまたは配列にパース（解析）し、
  // その結果をblogsという変数に格納します。この変数はBlogProp型の配列です。
  const paths = blogs.map((blog) => {
    // 取得したブログポストのデータを元に、それぞれのブログポストに対応するパス（URLのパラメータ）を生成します。
    return {
      params: {
        id: blog.id.toString()
      },
    };
    //  const paths = [
      //   { params: { id: "1" } },
      //   { params: { id: "2" } },
      //   { params: { id: "3" } },
      // ];
  });
  return {
    paths,
    fallback: false,
  };
  // getStaticPaths関数は、生成されたパス（paths）と、fallbackオプションを含むオブジェクトを返します。
  // fallback: trueは、存在しないパスにアクセスした場合に動的にページを生成することを許可します。
  // getStaticPaths の返り値は、静的に生成するページのパスと、ページが存在しない場合の動作を指定するオブジェクトになります。
  // paramsはcontextのプロパティです。
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // getStaticPropsという非同期関数を定義しています。この関数は、特定のパスに基づいてデータを取得し、
  // そのデータをページコンポーネントに渡すために使用されます。
  // getStaticPropsの引数はcontextと呼ばれるオブジェクトで、その中にはparams、preview、previewDataなど、
  // ページ生成時に利用可能な情報が含まれています。
  // ここで{ params }と記述しているのは、contextオブジェクトからparamsプロパティだけを取り出しているためです。
  // const context = {
  //   params: { id: "1" },
  //   // 他のプロパティも含まれます
  // };
  if (!params) {
    return {
      notFound: true,
    };
  }
  // paramsが存在しない場合（例: 無効なURLにアクセスした場合）、
  // ページが見つからないことを示すオブジェクトを返します。このオブジェクトは404エラーページの表示を指示します。
  // notFound は、Next.js の getStaticProps 関数で使用できるオプションの一つです
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  // params.idを使って、特定のブログポストのデータを取得するためにAPIリクエストを送信しています。
  // params.idはURLのパスから取得されます。

  const blog: BlogProp = await res.json();
  // 取得したレスポンスをJSON形式に変換し、その結果をblogという変数に格納します。
  // blogはBlogProp型のオブジェクトです。
  return {
    props: { blog },
  };
  // getStaticProps関数は、propsプロパティにblogオブジェクトを含むオブジェクトを返します。
  // このpropsがページコンポーネントに渡されます。
};

const BlogsId: React.FC<BlogsProps> = ({blog}) => {
  // BlogsIdという名前のReact関数コンポーネントを定義しています。
  // このコンポーネントはBlogsProps型のpropsを受け取り、その中からblogをデストラクチャリングしています。
  // 型注釈React.FC<BlogsProps>は、このコンポーネントがBlogsProps型のpropsを受け取ることを示しています。

  // ページコンポーネントの引数には、自動的にgetStaticPropsの返り値がpropsとして渡されます。
  // これにより、ページコンポーネント内でpropsにアクセスできるようになります。
  // 省略構文を使用し、propsオブジェクトから直接blogプロパティを取り出しています。
  return (
    <div>
      <h1>ブログ詳細</h1>
      <h3>ブログタイトル: {blog.title}</h3>
      <p>ブログID: {blog.id}</p>
      <p>ブログ内容: {blog.body}</p>
    </div>
  )
};

export default BlogsId;

// 重要な点
// getStaticPathsとgetStaticPropsはビルド時に実行されますが、これらは異なる役割を持ちます。
// getStaticPaths: ビルド時に一度だけ実行され、静的に生成するすべてのパス（URL）をNext.jsに指示します。
// 例えば、APIからブログポストのリストを取得し、それぞれのポストに対してidを含むパスを生成します。
// getStaticProps: これはgetStaticPathsで生成された各パスごとに個別に実行されます。
// つまり、getStaticPathsで定義されたidごとにgetStaticPropsが呼び出され、そのidに対応するデータを取得します。
// getStaticPropsは全てのIDに対して一度に実行されるわけではありません。
// getStaticPathsで定義されたパス（params）が一つずつgetStaticPropsに渡され、そのパスに対応するデータだけを取得します。
// したがって、ビルド時に各IDに対して個別にデータを取得するため、リクエストが同時に大量に行われることはありません。

// 大量のIDに対応するHTMLファイルの生成
// 例えば、数千、数万のIDがある場合、getStaticPathsでそれぞれのIDに対応するパスを生成し、
// getStaticPropsでそのIDごとのデータを取得してページを生成するとなると、ビルド時に数千、数万の静的HTMLファイルが生成されることになります。
// 生成されたHTMLファイルは、ユーザーが対応するIDのページにアクセスした際にサーバーから即座に返されます。
// これは、静的サイト生成（SSG）の大きなメリットで、ページのロードが非常に高速になります。

// ビルド時にデータ量が多くなる問題は、確かに考慮しなければならない点です。大量の静的ページを生成するには、ビルド時間が長くなるだけでなく、
// 生成されたファイルをホストするためのストレージも多く必要になります。
// また、すべてのページを静的に生成する必要があるかどうか、慎重に判断する必要があります。
// 特にデータが頻繁に更新される場合や、IDの数が非常に多い場合には、静的生成が適切でないこともあります。

// Next.jsの解決策
// Fallbackオプション: getStaticPathsのfallbackオプションを使用して、すべてのIDに対して静的ページを生成するのではなく、
// 一部のIDのみを静的に生成し、その他のIDに対するリクエストがあった場合には動的にページを生成するというアプローチがあります。

// fallback: true: この設定では、事前にビルド時に生成しなかったIDのページに対してリクエストが来た場合、
// その時に動的にページを生成し、その後にキャッシュして次回以降は静的ページとして返すことができます。
// fallback: blocking: この設定では、リクエストが来た時に動的にページを生成し、ユーザーに完全なページを返しますが、生成したページはその後にキャッシュされません。
// 動的レンダリング（Server-side Rendering, SSR）: すべてのページをビルド時に生成するのではなく、ユーザーからリクエストが来たときに必要なデータを取得し、
// その場でHTMLを生成して返すという方法です。これにより、ビルド時にすべてのHTMLを生成する必要がなくなり、ビルド時間やストレージの負担を軽減できます。
