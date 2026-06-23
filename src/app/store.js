import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/postSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default store;
