import { NextApiRequest, NextApiResponse } from "next";
import { comments } from "../../../data/store";

export default function handler(req: NextApiRequest, res: NextApiResponse){
  if (req.method === "POST") {
    const { postId, content } = req.body;
    const newComment = { id: `${comments.length + 1}`, postId, content };
    comments.push(newComment);
    res.status(201).json(newComment);
  } else if (req.method == "GET") {
    res.status(200).json(comments);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}