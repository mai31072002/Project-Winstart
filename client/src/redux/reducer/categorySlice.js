import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async action để fetch sản phẩm theo danh mục
export const fetchCategoryProducts = createAsyncThunk(
    "category/fetchCategoryProducts",
    async ({ category_slug, page, filters }, { rejectWithValue }) => {
        try {
            let query = `http://localhost:4000/api/products?category_slug=${category_slug}&page=${page}&priceFilter=${filters}`;
            
            // Nếu có bộ lọc giá, thêm vào query
            // if (filters.length > 0) {
            //     query += `&priceFilter=${filters.join(",")}`;
            // }

            const response = await fetch(query);

            // Kiểm tra lỗi HTTP (404, 500, ...)
            if (!response.ok) {
                return rejectWithValue({ 
                    message: `Lỗi ${response.status}: ${response.statusText}` 
                });
            }

            const data = await response.json();
            // console.log(`state 1`, filters);
            // console.log(`error`, data);
            

            // Kiểm tra dữ liệu trả về có hợp lệ không
            if (!data || !Array.isArray(data.products)) {
                return rejectWithValue({ message: "Dữ liệu trả về không hợp lệ" });
            }

            // Kiểm tra mảng sản phẩm có rỗng không
            // if (data.products.length === 0) {
            //     return rejectWithValue({ message: "Không có sản phẩm nào trong danh mục này" });
            // }

            // Kiểm tra xem mỗi sản phẩm có đầy đủ thông tin quan trọng không
            if (!data.products.every(p => p.id)) {
                return rejectWithValue({ message: "Dữ liệu sản phẩm không hợp lệ" });
            }

            return {
                products: data.products,
                totalProducts: data.pagination?.totalProducts || 0,
                totalPages: data.pagination?.totalPages || 1, 
            };

        } catch (error) {
            // Bắt lỗi kết nối mạng hoặc lỗi fetch
            return rejectWithValue({ message: "Lỗi kết nối đến server! Vui lòng kiểm tra lại mạng." });
        }
    }
);

  

const categorySlice = createSlice({
  name: "productcategory",
  initialState: {
    items: [],
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    limit: 8, // Số sản phẩm mỗi trang
    filters: [],
    error: null,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    // tự động tạo action.type => products/fecthProductsB/pending 
        .addCase(fetchCategoryProducts.pending, (state) => {
            state.status = "loading";
        })            
        .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.items = action.payload.products;
            state.totalProducts = action.payload.totalProducts;
            state.totalPages = action.payload.totalPages;
        })
        .addCase(fetchCategoryProducts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload.message;
            state.items = [];
            state.totalProducts = action.payload.totalProducts;
            state.totalPages = action.payload.totalPages;
        });
  },
});

export const { setPage, setFilters } = categorySlice.actions;
export default categorySlice.reducer;
