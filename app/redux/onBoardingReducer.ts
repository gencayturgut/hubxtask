import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { OnboardingState } from './types'

const initialState: OnboardingState = {
  completed: false,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    completeOnboarding(state) {
      state.completed = true;
    },
  },
});

export const { completeOnboarding } = onboardingSlice.actions;
export default onboardingSlice.reducer;
