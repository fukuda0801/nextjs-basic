import { NextApiRequest, NextApiResponse } from "next";

const fruits = ["りんご", "バナナ", "みかん", "いちご", "ぶどう"];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query;

  if (typeof q === "string") {
    const filteredFruits = fruits.filter((fruit) => fruit.includes(q));
    res.status(200).json(filteredFruits);
  } else {
    res.status(200).json(fruits);
  }
}
