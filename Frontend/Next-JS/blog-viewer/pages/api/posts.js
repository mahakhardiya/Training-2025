const posts = [
  { id: 1, title: 'Hello Next.js', content: 'This is a post about getting started with Next.js.' },
  { id: 2, title: 'Testing with Jest', content: 'Unit testing is crucial for building robust applications.' },
  { id: 3, title: 'Static Site Generation', content: 'getStaticProps is a powerful feature for performance.' },
];

export default function handler(req, res) {
  res.status(200).json(posts);
}