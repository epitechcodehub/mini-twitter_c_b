interface Post {
  id: string;
  title: string;
  content: string;
}

interface Comment {
  id: string;
  postId: string;
  content: string;
}

export const posts: Post[] = [];
export const comments: Comment[] = [];