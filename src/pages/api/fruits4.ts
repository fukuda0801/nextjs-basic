import { NextApiRequest, NextApiResponse } from "next";

const fruits = ["apple", "banana", "melon", "peach", "cherry"];
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { q } = req.query;
  if (typeof q === "string") {
    const filterFruits = fruits.filter((fruit) => fruit.includes(q));
    res.status(200).json(filterFruits);
  } else {
    res.status(200).json(fruits);
  }
};

export default handler;
