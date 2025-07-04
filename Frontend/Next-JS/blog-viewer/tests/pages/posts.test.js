import { getStaticProps } from '../../pages/posts/index';

// We mock the global 'fetch' function
global.fetch = jest.fn();

describe('getStaticProps for PostsPage', () => {
  it('should fetch posts and return them as props', async () => {
    const mockPosts = [
      { id: 1, title: 'Mock Post 1' },
      { id: 2, title: 'Mock Post 2' },
    ];

    // Tell our mock fetch what to return when it's called
    fetch.mockResolvedValueOnce({
      json: async () => mockPosts,
    });

    // Call the function we are testing
    const result = await getStaticProps({});

    // Assert that the result has the correct shape and data
    expect(result).toEqual({
      props: {
        posts: mockPosts,
      },
    });

    // Assert that fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/posts');
  });
});