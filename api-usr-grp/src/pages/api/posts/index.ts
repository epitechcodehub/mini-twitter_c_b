import { NextApiRequest, NextApiResponse } from "next";
import { posts } from "../../../data/store";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { title, content } = req.body;
    const newPost = { id: `${posts.length + 1}`, title, content };
    posts.push(newPost);
    res.status(201).json(newPost);
  } else if (req.method === "GET") {
    res.status(200).json(posts);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}