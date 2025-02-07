import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { Post, Comment } from '../../data/store';

interface PostsPageProps {
  posts: Post[];
  comments: Comment[];
}

const PostsPage: React.FC<PostsPageProps> = ({ posts, comments }) => {
  const [commentContent, setCommentContent] = useState('');
  const [selectedPostId, setSelectedPostId] = useState('');

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPostId || !commentContent) return;

    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId: selectedPostId, content: commentContent }),
    });

    // if (res.ok) {
    //   setCommentContent('');
    //   setSelectedPostId('');
    // }
  };

  return (
    <div>
      <h1>Posts</h1>
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
            <form onSubmit={handleCommentSubmit}>
              <input
                type="hidden"
                value={post.id}
                onChange={(e) => setSelectedPostId(e.target.value)}
              />
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Add a comment"
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
  const postsRes = await fetch('http://localhost:3000/api/posts');
  const posts: Post[] = await postsRes.json();

  const commentsRes = await fetch('http://localhost:3000/api/comments');
  const comments: Comment[] = await commentsRes.json();

  return {
    props: {
      posts,
      comments,
    },
  };
};

export default PostsPage;