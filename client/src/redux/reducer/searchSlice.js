import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk để gọi API tìm kiếm sản phẩm
export const fetchSearchedProducts = createAsyncThunk(
  "search/fetchSearchedProducts",
  async ({ searchItem, page }, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/products", {
        params: { search: searchItem, page },
      });
      console.log("search value", searchItem);
      console.log("search product", response);

      return response.data; // Đảm bảo API trả về đúng danh sách sản phẩm
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi khi tìm kiếm");
    }
  }
);


const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchItem: "",
    products: [],
    currentPage: 1,
    totalPages: 1,
    status: "idle",
    error: null,
  },
  reducers: {
    setSearchItem: (state, action) => {
      state.searchItem = action.payload;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchedProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearchedProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products;
        state.totalProducts = action.payload.pagination.totalProducts;
        state.totalPages = action.payload.pagination.totalPages; 
      })
      .addCase(fetchSearchedProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setSearchItem, setPage } = searchSlice.actions;
export default searchSlice.reducer;

