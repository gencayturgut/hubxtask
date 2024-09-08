import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Category } from "../types";

export interface CategoryState {
    categories: Category[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    }

const initialState: CategoryState = {
    categories: [],
    status: 'idle',
    error: null,
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.status = 'failed';
                state.error = 'Failed to fetch categories';
            });
    },
});

export const fetchCategories = createAsyncThunk( 'categories/fetchCategories', async () => {
    const response = await fetch('https://dummy-api-jtg6bessta-ey.a.run.app/getCategories');
    console.log("response", response);
    return response.json();
});

export default categorySlice.reducer;