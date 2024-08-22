import React, { useState } from "react";
import useSWR from "swr";

const Fruit5: React.FC = () => {
  const [fruitName, setFruitName] = useState("");
  const feature = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(`/api/fruits5?q=${fruitName}`, feature);
  if (error) return <div>エラー発生</div>;
  if (!data) return <div>ロード中です</div>;
  return (
    <div>
      <input
        type="text"
        name="q"
        value={fruitName}
        onChange={(e) => setFruitName(e.target.value)}
        autoFocus
      />

      {data?.map((fruit: string, index: number) => {
        return <li key={index}>{fruit}</li>;
      })}
    </div>
  );
};

export default Fruit5;
