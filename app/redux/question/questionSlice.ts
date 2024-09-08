import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Question } from "../types";

interface QuestionState {
    questions: Question[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: QuestionState = {
    questions: [],
    status: 'idle',
    error: null,
};

const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getQuestionsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getQuestionsAsync.fulfilled, (state, action) => {
                state.questions = action.payload;
                state.status = 'succeeded';
            })
            .addCase(getQuestionsAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = 'Failed to fetch questions';
            });
    },
});

export const getQuestionsAsync = createAsyncThunk( 'questions/fetchQuestions', async () => {
    const response = await fetch('https://dummy-api-jtg6bessta-ey.a.run.app/getQuestions');
    return response.json();
});


export default questionSlice.reducer;