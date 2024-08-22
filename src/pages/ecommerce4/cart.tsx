import { GetServerSideProps } from "next";

type CartItem = {
  id: number;
  name: string;
  count: number;
  price: number;
}

type CartProps = {
  items: CartItem[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:8000/posts");
  const items = await res.json();
  return {
    props: {
      items,
    },
  };
};

const CartPage: React.FC<CartProps> = ({items}) => {
  let totalPrice = 0;
  items.forEach((item) => {
    totalPrice += item.count * item.price;
  })
  return (
    <div>
      <h1>ショッピングカート</h1>
      {items.map((item) => {
        return (
          <ul key={item.id}>
            <li>商品名: {item.name}</li>
            <li>数量: {item.count}</li>
            <li>値段：{item.price}</li>
            <li>小計: {item.price * item.count}</li>
          </ul>
        )
      })}
      <p>合計金額{totalPrice}</p>
    </div>
  )
}

export default CartPage;
