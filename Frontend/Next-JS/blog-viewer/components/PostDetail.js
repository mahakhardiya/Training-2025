const PostDetail = ({ post }) => {
  // If no post is selected, show a message.
  if (!post) {
    return <div className="post-detail-placeholder">Select a post to see the details.</div>;
  }

  // Otherwise, display the post's title and content.
  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
};

export default PostDetail;