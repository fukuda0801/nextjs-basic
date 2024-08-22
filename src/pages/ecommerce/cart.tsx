import React from "react";
import { GetServerSideProps } from "next";
// GetServerSidePropsはNext.jsが提供するTypeScriptの型です。
// この型は、getServerSideProps関数がどのような構造や戻り値を持つべきかを定義しています。これにより、TypeScriptの型チェック機能を利用して、
// getServerSidePropsが正しい形式で実装されているかを検証できます。

type CartItem = {
  id: number;
  name: string;
  count: number;
  price: number;
};

type CartProps = {
  cartItems: CartItem[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  // getServerSidePropsという非同期関数を定義しています。この関数は、ページがリクエストされるたびにサーバー側で実行されます。
  // ここでデータを取得し、それをページに渡すためのpropsとして返します。
  const res = await fetch("http://localhost:3001/posts");
  // fetchを使って、json-serverが提供するAPIからデータを取得しています。awaitを使って非同期処理が完了するのを待っています。
  // "http://localhost:3001/posts"にアクセスして、カート内の商品のデータを取得しています。
  const cartItems: CartItem[] = await res.json();
  // res.json()の結果は、JSON形式のレスポンスをJavaScriptのオブジェクトまたは配列にパースするためのものです。
  // サーバーから返ってきたJSONが配列の形式なら、res.json()の結果も配列になります。今回は配列です。
  // これにより、cartItemsにはカート内の商品データが格納されます。この変数の型は、先ほど定義したCartItem[]型です。

  return {
    props: {
      cartItems,
    },
  };
  // getServerSideProps関数はオブジェクトを返します。このオブジェクトの中にはpropsというオブジェクトのプロパティがあり、
  // その中にcartItemsを格納しています。これにより、cartItemsがCartPageコンポーネントにpropsとして渡されます。
  // getServerSidePropsやgetStaticPropsの返り値は、propsというプロパティが含まれつ必要があり、このpropsオブジェクト
  // のなかにページコンポーネントに渡すデータを格納します。
  // getServerSidePropsやgetStaticPropsでは、{ props: ページに渡す値 }という形式のオブジェクトを必ず返す必要があります。
};

const CartPage: React.FC<CartProps> = ({ cartItems }) => {
  // CartPageという名前のReact関数コンポーネントを定義しています。このコンポーネントはCartProps型のpropsを受け取ります。
  // propsからcartItemsをデストラクチャリングしています。
  // getServerSidePropsが返すオブジェクトの中のpropsプロパティは、自動的にページコンポーネントに渡されます。
  // そのため、コンポーネントの引数として受け取ることができます。
  // ここで、{ cartItems }と記述しているのは、propsオブジェクトのcartItemsプロパティをデストラクチャリングして直接取り出しているためです。
  // これにより、props.cartItemsと記述する代わりに、cartItemsだけでアクセスできます。
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.count, 0);

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <h2>{item.name}</h2>
              <p>数量: {item.count}</p>
              <p>値段: {item.price} JPY</p>
              <p>小計: {item.price * item.count} JPY</p>
            </li>
          ))}
        </ul>
      )}
      <h3>合計金額: {totalAmount} 円</h3>
    </div>
  );
};

export default CartPage;

// 重要な点
// getServerSidePropsが呼び出されたときに、Next.jsは自動的にcontextオブジェクトを引数として渡します。
// contextオブジェクトは、ページのリクエストに関する情報を提供し、
// その情報を基にサーバーサイドでデータを取得したり、処理を行うために使用されます。

// contextには、次のようなプロパティが含まれます：
// params: 動的ルーティングのパラメータが含まれます。例えば、/posts/[id]というルートがあり、/posts/1にアクセスした場合、paramsには{ id: '1' }が含まれます。
// req: リクエストオブジェクト（http.IncomingMessage）です。
// res: レスポンスオブジェクト（http.ServerResponse）です。
// query: クエリパラメータが含まれます。例えば、/posts?id=1のようなリクエストがあった場合、queryには{ id: '1' }が含まれます。

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { params, query } = context;
//   // ここでparamsやqueryを使ってデータを取得することができます
// };
// もしparamsやqueryを使いたい場合、以下のようにcontextを引数として受け取り、その中から必要な情報をデストラクチャリングして使うことができます。
