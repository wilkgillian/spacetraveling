import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import Header from '../components/Header';
import { GetStaticProps } from 'next';
import {FiCalendar, FiUser} from 'react-icons/fi'
import Link from 'next/link';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  return (
    <main className={commonStyles.container}>
      <Header />
      <div>
        {postsPagination.results.map(post => {
          <Link passHref href={`/post/${post.uid}`}>
            <a className={styles.post}>
              <strong>{post.data.title}</strong>
              <p>{post.data.subtitle}</p>
              <ul>
                <li>
                  <FiCalendar />
                  {post.first_publication_date}</li>
                <li>
                  <FiUser />
                {post.data.author}</li>
              </ul>
            </a>
          </Link>
        })}
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('posts', {
    pageSize: 5,
    orderings: {
      field: 'last_publication_date',
      direction: 'desc',
    },
  });

  const postsPagination = {
    next_page: postsResponse.next_page,
    results: postsResponse.results,
  };

  return {
    props: {
      postsPagination,
    },
  };
};
