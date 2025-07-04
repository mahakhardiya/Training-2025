import { render, screen, fireEvent } from '@testing-library/react';
import PostList from '../../components/PostList';

// Create a mock list of posts for our tests
const mockPosts = [
  { id: 1, title: 'First Post' },
  { id: 2, title: 'Second Post' },
];

describe('PostList', () => {
  it('renders a list of post titles', () => {
    // A mock function for the onSelectPost prop
    const mockOnSelectPost = jest.fn();
    render(<PostList posts={mockPosts} onSelectPost={mockOnSelectPost} />);

    // Check if both post titles are rendered as buttons
    expect(screen.getByRole('button', { name: 'First Post' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Second Post' })).toBeInTheDocument();
  });

  it('calls onSelectPost with the correct post ID when a post is clicked', () => {
    const mockOnSelectPost = jest.fn();
    render(<PostList posts={mockPosts} onSelectPost={mockOnSelectPost} />);

    // Find the button for the first post
    const firstPostButton = screen.getByRole('button', { name: 'First Post' });
    
    // Simulate a user click
    fireEvent.click(firstPostButton);

    // Assert that our mock function was called, and called with the correct argument (the post's ID)
    expect(mockOnSelectPost).toHaveBeenCalledWith(1);
  });
});