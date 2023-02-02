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
  const posts: Array<{ id; title }> = await (await fetch(`${getHost(req)}/api/blog`)).json();

  return {
    props: {
      posts,
    },
  };
}

export default Blog;
