import { ChangeEvent, useState } from "react";
import useSWR from "swr";


const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function FruitsPage() {
  const [fruitName, setFruitName] = useState("");
  const { data, error } = useSWR(`/api/fruits?q=${fruitName}`, fetcher);

  if (error) return <div>データの取得に失敗しました。</div>;
  if (!data) return <div>ロード中...</div>;

  return (
    <div>
      <input
        type="text"
        name="q"
        placeholder="フルーツを検索"
        value={fruitName}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setFruitName(e.target.value)}
        autoFocus
      />
      <ul>
        {data?.map((fruit: string, index: number) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}
