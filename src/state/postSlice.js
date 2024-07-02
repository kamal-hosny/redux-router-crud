import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    records: [],
    loading: false,
    error: null,
    record: null
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch("http://localhost:5005/posts");
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchPost = createAsyncThunk("posts/fetchPost", async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`http://localhost:5005/posts/${id}`);
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deletePost = createAsyncThunk("posts/deletePost", async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`http://localhost:5005/posts/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) {
            throw new Error('Failed to delete the post');
        }
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const insertPost = createAsyncThunk("posts/insertPost", async (item, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState();
    item.userId = auth.id;
    try {
        const res = await fetch("http://localhost:5005/posts", {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const editPost = createAsyncThunk("posts/editPost", async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`http://localhost:5005/posts/${item.id}`, {
            method: "PATCH",
            body: JSON.stringify(item),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        cleanRecord: (state) => {
            state.record = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // get post
            .addCase(fetchPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPost.fulfilled, (state, action) => {
                state.loading = false;
                state.record = action.payload;
            })
            .addCase(fetchPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // fetch posts
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.records = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // create post
            .addCase(insertPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(insertPost.fulfilled, (state, action) => {
                state.loading = false;
                state.records.push(action.payload);
            })
            .addCase(insertPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // delete post
            .addCase(deletePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.loading = false;
                state.records = state.records.filter((el) => el.id !== action.payload);
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // edit post
            .addCase(editPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editPost.fulfilled, (state, action) => {
                state.loading = false;
                state.record = action.payload;
            })
            .addCase(editPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { cleanRecord } = postSlice.actions;
export default postSlice.reducer;
