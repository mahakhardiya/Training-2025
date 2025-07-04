import { useState } from 'react';
import PostList from '../../components/PostList';
import PostDetail from '../../components/PostDetail';
import { useRouter } from 'next/router';

// 1. DATA FETCHING: This function runs at build time on the server.
export async function getStaticProps() {
  // Fetch data from our own API endpoint.
  const res = await fetch('http://localhost:3000/api/posts');
  const posts = await res.json();

  // The props returned here will be passed to the page component.
  return {
    props: {
      posts,
    },
  };
}

// 2. THE PAGE COMPONENT
export default function PostsPage({ posts }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const router = useRouter();

  // Bonus: Handle the loading state provided by Next.js for fallback pages.
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const handleSelectPost = (postId) => {
    // Find the full post object from the list by its ID.
    const post = posts.find((p) => p.id === postId);
    setSelectedPost(post);
  };

  return (
    <div className="container">
      <h1>Blog Posts</h1>
      <div className="content-wrapper">
        <div className="list-pane">
          <PostList posts={posts} onSelectPost={handleSelectPost} />
        </div>
        <div className="detail-pane">
          <PostDetail post={selectedPost} />
        </div>
      </div>
    </div>
  );
}