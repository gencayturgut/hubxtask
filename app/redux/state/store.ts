import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../category/categorySlice';
import onboardingReducer from '../onBoardingReducer';
import questionReducer from '../question/questionSlice';
import axios from 'axios';

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    onboarding: onboardingReducer,
    questions: questionReducer,
  },
});


const api = axios.create({
  baseURL: 'https://dummy-api-jtg6bessta-ey.a.run.app',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default api;