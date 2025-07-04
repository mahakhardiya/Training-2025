import { render, screen } from '@testing-library/react';
import PostDetail from '../../components/PostDetail';

describe('PostDetail', () => {
  it('shows a placeholder when no post is selected', () => {
    render(<PostDetail post={null} />);
    expect(screen.getByText('Select a post to see the details.')).toBeInTheDocument();
  });

  it('renders the post title and content when a post is provided', () => {
    const mockPost = {
      id: 1,
      title: 'My Test Post',
      content: 'This is the content of the test post.',
    };
    render(<PostDetail post={mockPost} />);

    // Check for the title (using role 'heading' is good practice)
    expect(screen.getByRole('heading', { name: 'My Test Post' })).toBeInTheDocument();
    // Check for the content
    expect(screen.getByText('This is the content of the test post.')).toBeInTheDocument();
  });
});