import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Food } from "../types";

interface FoodState {
  items: Food[];
  loading: boolean;
  error: string | null;
}

const initialState: FoodState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchFoods = createAsyncThunk("foods/fetchFoods", async () => {
  const response = await fetch("http://localhost:3000/foods");
  if (!response.ok) {
    throw new Error("Failed to fetch foods");
  }
  return (await response.json()) as Food[];
});

const foodSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoods.fulfilled, (state, action: PayloadAction<Food[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFoods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch foods";
      });
  },
});

export default foodSlice.reducer;
