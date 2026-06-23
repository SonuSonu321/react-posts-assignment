import { useDispatch } from 'react-redux';
import { removePost } from '../features/postSlice';
import { IoCloseCircle } from 'react-icons/io5';

/**
 * PostCard displays a single post with a red close button to remove it.
 * @param {{ post: { id: number, title: string, body: string } }} props
 */
function PostCard({ post }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removePost(post.id));
  };

  return (
    <article className="post-card">
      <button
        className="post-card__remove-btn"
        onClick={handleRemove}
        aria-label={`Remove post: ${post.title}`}
        title="Remove post"
      >
        <IoCloseCircle />
      </button>

      <span className="post-card__id">#{post.id}</span>
      <h2 className="post-card__title">{post.title}</h2>
      <p className="post-card__body">{post.body}</p>
    </article>
  );
}

export default PostCard;
