import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const POSTS_PER_PAGE = 6;

// Fetch all posts from the API
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
});

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    allPosts: [],       // full list from API (mutated on delete)
    currentPage: 1,
    status: 'idle',     // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },

    // Remove a post by id and keep the current page showing 6 cards
    removePost(state, action) {
      const postId = action.payload;
      state.allPosts = state.allPosts.filter((post) => post.id !== postId);

      // Recalculate total pages after removal
      const totalPages = Math.ceil(state.allPosts.length / POSTS_PER_PAGE);

      // If current page is now beyond total pages, go back one
      if (state.currentPage > totalPages) {
        state.currentPage = totalPages;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allPosts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage, removePost } = postSlice.actions;

// Selectors
export const selectAllPosts = (state) => state.posts.allPosts;
export const selectCurrentPage = (state) => state.posts.currentPage;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;

export const selectTotalPages = (state) =>
  Math.ceil(state.posts.allPosts.length / POSTS_PER_PAGE);

// Returns only the 6 posts for the current page
export const selectCurrentPagePosts = (state) => {
  const { allPosts, currentPage } = state.posts;
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  return allPosts.slice(start, start + POSTS_PER_PAGE);
};

export default postSlice.reducer;
