import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, selectCurrentPagePosts, selectPostsStatus, selectPostsError } from '../features/postSlice';
import PostCard from '../components/postCard';
import Pagination from '../components/pagination';

const LOADING_DURATION_MS = 5000;

/**
 * Home page — shows 5s loading screen on startup, then the posts grid.
 */
function Home() {
  const dispatch = useDispatch();
  const postsStatus = useSelector(selectPostsStatus);
  const postsError = useSelector(selectPostsError);
  const currentPagePosts = useSelector(selectCurrentPagePosts);

  // Controls whether the mandatory 5-second splash is still showing
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  // Kick off the API fetch and start the 5s timer in parallel
  useEffect(() => {
    dispatch(fetchPosts());

    const splashTimer = setTimeout(() => {
      setIsSplashVisible(false);
    }, LOADING_DURATION_MS);

    return () => clearTimeout(splashTimer);
  }, [dispatch]);

  // Show loading screen for 5 seconds OR while data is still being fetched
  const isLoading = isSplashVisible || postsStatus === 'loading';

  if (isLoading) {
    return (
      <div className="loading-screen" role="status" aria-live="polite">
        <div className="loading-screen__spinner" aria-hidden="true" />
        <p className="loading-screen__text">Loading...</p>
      </div>
    );
  }

  if (postsStatus === 'failed') {
    return (
      <div className="error-screen" role="alert">
        <p>Failed to load posts: {postsError}</p>
      </div>
    );
  }

  return (
    <main className="home">
      <header className="home__header">
        <h1 className="home__title">Posts</h1>
      </header>

      <section className="posts-grid" aria-label="Posts list">
        {currentPagePosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>

      <Pagination />
    </main>
  );
}

export default Home;
