import React, { useState } from "react";
import useSWR from "swr";

const Fruits4: React.FC = () => {
  const [fruitName, setFruitName] = useState("");
  const feature = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(`/api/fruits4?q=${fruitName}`, feature);

  if (error) return <div>エラーが発生しました。</div>;
  if (!data) return <div>値を取得中です。</div>;

  return (
    <div>
      <input
        type="text"
        value={fruitName}
        name="q"
        onChange={(e) => setFruitName(e.target.value)}
        autoFocus
        placeholder="フルーツを検索"
      />
      <ul>
        {data?.map((fruit: string, index: number) => {
          return <li key={index}>{fruit}</li>;
        })}
      </ul>
    </div>
  );
};

export default Fruits4;
