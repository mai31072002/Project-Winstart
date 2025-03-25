import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API 1: Fetch sản phẩm theo ID
export const fetchSingleProducts = createAsyncThunk(
    "single/fetchSingleProducts",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:4000/api/products?id=${id}`);
            if (!response.ok) throw new Error(`Lỗi ${response.status}: ${response.statusText}`);

            const data = await response.json();
            if (!data || !Array.isArray(data.products)) throw new Error("Dữ liệu không hợp lệ");

            return data.products;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// API 2: Fetch sản phẩm liên quan theo category
export const fetchRelatedProducts = createAsyncThunk(
    "single/fetchRelatedProducts",
    async (category_slug, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:4000/api/products?category_slug=${category_slug}`);
            if (!response.ok) throw new Error(`Lỗi ${response.status}: ${response.statusText}`);

            const data = await response.json();
            if (!data || !Array.isArray(data.products)) throw new Error("Dữ liệu không hợp lệ");

            return data.products;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const singleSlice = createSlice({
  name: "single",
  initialState: {
    item: null, // Chỉ lưu 1 sản phẩm thay vì danh sách
    relatedItems: [],
    status: "idle",
    relatedStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
        // Xử lý API 1
        .addCase(fetchSingleProducts.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchSingleProducts.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.item = action.payload[0]; // Lấy sản phẩm đầu tiên
        })
        .addCase(fetchSingleProducts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })

        // Xử lý API 2
        .addCase(fetchRelatedProducts.pending, (state) => {
            state.relatedStatus = "loading";
        })
        .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
            state.relatedStatus = "succeeded";
            state.relatedItems = action.payload;
        })
        .addCase(fetchRelatedProducts.rejected, (state, action) => {
            state.relatedStatus = "failed";
            state.error = action.payload;
        });
  },
});

export default singleSlice.reducer;
