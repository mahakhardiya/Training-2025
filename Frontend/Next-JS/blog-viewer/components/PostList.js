const PostList = ({ posts, onSelectPost }) => {
  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.id}>
          <button onClick={() => onSelectPost(post.id)}>{post.title}</button>
        </li>
      ))}
    </ul>
  );
};

export default PostList;