import { NextApiRequest, NextApiResponse } from 'next';
import { openDb } from '../../../data/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await openDb();

  if (req.method === 'POST') {
    const { title, content } = req.body;
    const result = await db.run('INSERT INTO Post (title, content) VALUES (?, ?)', [title, content]);
    const newPost = { id: result.lastID, title, content };
    res.status(201).json(newPost);
  } else if (req.method === 'GET') {
    const posts = await db.all('SELECT * FROM Post');
    res.status(200).json(posts);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}