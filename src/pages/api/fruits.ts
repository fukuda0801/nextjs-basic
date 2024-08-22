import { NextApiRequest, NextApiResponse } from 'next';

const fruits = ["りんご", "バナナ", "みかん", "ぶどう", "もも", "パイナップル", "マンゴー"];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query;

  if (typeof q === 'string') {
    // クエリ文字列を含むフルーツだけをフィルタリング
    const filteredFruits = fruits.filter(fruit => fruit.includes(q));
    return res.status(200).json(filteredFruits);
  }

  // クエリがない場合は全てのフルーツを返す
  return res.status(200).json(fruits);
}
