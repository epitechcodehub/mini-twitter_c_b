import { NextApiRequest, NextApiResponse } from 'next';
import { openDb } from '../../../data/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await openDb();

  if (req.method === 'POST') {
    const { postId, content } = req.body;
    const result = await db.run('INSERT INTO Comment (postId, content) VALUES (?, ?)', [postId, content]);
    const newComment = { id: result.lastID, postId, content };
    res.status(201).json(newComment);
  } else if (req.method === 'GET') {
    const comments = await db.all('SELECT * FROM Comment');
    res.status(200).json(comments);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}