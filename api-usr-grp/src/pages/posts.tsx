import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { openDb } from '../data/database';

interface Post {
  id: number;
  title: string;
  content: string;
}

interface Comment {
  id: number;
  postId: number;
  content: string;
}

interface PostsPageProps {
  posts: Post[];
  comments: Comment[];
}

const PostsPage: React.FC<PostsPageProps> = ({ posts, comments }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [commentContent, setCommentContent] = useState<{ [key: number]: string }>({});
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      window.location.reload();
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent, postId: number) => {
    e.preventDefault();
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId, content: commentContent[postId] }),
    });
    if (res.ok) {
      window.location.reload();
    }
  };

  const handleCommentChange = (postId: number, content: string) => {
    setCommentContent((prev) => ({
      ...prev,
      [postId]: content,
    }));
  };

  return (
    <div>
      <h1>Posts</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        />
        <button type="submit">Add Post</button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <h3>Comments</h3>
            <ul>
              {comments
                .filter((comment) => comment.postId === post.id)
                .map((comment) => (
                  <li key={comment.id}>{comment.content}</li>
                ))}
            </ul>
            <form onSubmit={(e) => handleCommentSubmit(e, post.id)}>
              <textarea
                value={commentContent[post.id] || ''}
                onChange={(e) => handleCommentChange(post.id, e.target.value)}
                placeholder="Add a comment"
                required
              />
              <button type="submit">Submit</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const db = await openDb();
  const posts = await db.all('SELECT * FROM Post');
  const comments = await db.all('SELECT * FROM Comment');

  return {
    props: {
      posts,
      comments,
    },
  };
};

export default PostsPage;