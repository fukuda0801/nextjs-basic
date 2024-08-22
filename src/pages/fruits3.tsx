import { useState } from "react";
import useSWR from "swr";

const FruitsPage: React.FC = () => {
  const [fruitName, setFruitName] = useState("");
  const feature = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(`/api/fruits3?q=${fruitName}`, feature);
  if (error) return <div>データの取得に失敗しました。</div>;
  if (!data) return <div>ロード中</div>;
  return (
    <div>
      <h1>フルーツ検索</h1>
      <input
        type="text"
        name="q"
        placeholder="フルーツを検索"
        value={fruitName}
        onChange={(e) => setFruitName(e.target.value)}
        autoFocus
      />

      <ul>
        {data?.map((fruit: string, index: number) => {
          return <li key={index}>{fruit}</li>;
        })}
      </ul>
    </div>
  );
};

export default FruitsPage;
