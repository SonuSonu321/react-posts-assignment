import { useDispatch } from 'react-redux';
import { removePost } from '../features/postSlice';

// Stable fake date — matches the wireframe style
const PLACEHOLDER_DATE = 'Mon, 21 Dec 2020 14:57 GMT';

/**
 * PostCard displays a single post card matching the wireframe:
 * title → excerpt → date → thumbnail image, with an ✕ remove button.
 *
 * @param {{ post: { id: number, title: string, body: string } }} props
 */
function PostCard({ post }) {
  const dispatch = useDispatch();

  // Picsum gives a deterministic image per post ID
  const imageUrl = `https://picsum.photos/seed/${post.id}/400/200`;

  const handleRemove = () => {
    dispatch(removePost(post.id));
  };

  return (
    <article className="post-card">
      {/* Red ✕ remove button — top right */}
      <button
        className="post-card__remove-btn"
        onClick={handleRemove}
        aria-label={`Remove post: ${post.title}`}
        title="Remove post"
      >
        ✕
      </button>

      {/* Text content */}
      <div className="post-card__content">
        <h2 className="post-card__title">{post.title}</h2>
        <p className="post-card__body">{post.body}</p>
        <time className="post-card__date" dateTime="2020-12-21">
          {PLACEHOLDER_DATE}
        </time>
      </div>

      {/* Thumbnail image at the bottom */}
      <img
        className="post-card__image"
        src={imageUrl}
        alt={`Thumbnail for post ${post.id}`}
        loading="lazy"
      />
    </article>
  );
}

export default PostCard;
