import React, { useState, useRef, useEffect, useCallback } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const FruitsPage: React.FC = () => {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, error } = useSWR(() => `/api/fruits?q=${text}`, fetcher);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [data]);

  if (error) return <div>エラーが発生しました。</div>;
  if (!data) return <div>読み込み中...</div>;

  return (
    <div>
      <h1>フルーツ検索</h1>
      <input
        ref={inputRef}
        type="text"
        placeholder="フルーツを検索"
        value={text}
        onChange={handleChange}
        autoFocus
      />
      <ul>
        {data.map((fruit: string) => (
          <li key={fruit}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
};

export default FruitsPage;
