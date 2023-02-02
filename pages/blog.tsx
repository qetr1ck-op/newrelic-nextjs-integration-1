import Link from 'next/link';

import Layout from '../components/Layout';
import * as http from 'http';
import { getHost } from '../lib/lib';

function Blog({ posts }) {
  return (
    <Layout>
      <p>
        <Link href="/">
          <a>Home</a>
        </Link>
      </p>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`} as={`/posts/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const posts: Array<{ id; title }> = await new Promise((resolve, reject) => {
    http
      .get(`${getHost(req)}/api/blog`, (res) => {
        let body = '';
        res.on('data', (data) => (body += data.toString('utf8')));
        res.on('end', () => {
          resolve(JSON.parse(body));
        });
      })
      .on('error', reject);
  });

  return {
    props: {
      posts,
    },
  };
}

export default Blog;
