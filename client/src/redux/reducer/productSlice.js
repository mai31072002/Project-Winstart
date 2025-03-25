import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsB = createAsyncThunk(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/api/home");

            // console.log(`Sản phẩm data`, response.data);

            return response.data; // Axios tự động parse JSON nên không cần .json()
        } catch (error) {
            if (error.response) {
                // API phản hồi nhưng có lỗi (4xx hoặc 5xx)
                if (error.response.status === 404) {
                    return rejectWithValue("Lỗi 404: API không tìm thấy!");
                } else if (error.response.status === 500) {
                    return rejectWithValue("Lỗi 500: Lỗi máy chủ!");
                } else {
                    return rejectWithValue(`Lỗi ${error.response.status}: ${error.response.statusText}`);
                }
            } else if (error.request) {
                // Request đã được gửi nhưng không có phản hồi từ server
                return rejectWithValue("Lỗi mạng hoặc server không phản hồi!");
            } else {
                // Có lỗi khác xảy ra
                return rejectWithValue("Lỗi không xác định khi gọi API!");
            }
        }
    }
);



/** createAsyncThunk: tự động tạo 3 trạng thái (action type) là (pending, fulfilled, rejected)
 * redux toolkit thêm hậu tố vào : 
 *      products/fetchProducts/pending
 *      products/fetchProducts/fulfilled
 *      products/fetchProducts/rejected
 */


const productSlice = createSlice({
    name: "products",
    initialState: {
        categories: [],
        products: [],
        status: "idle",
        error: null,
    },

    // Sử dụng reducers cho action đồng bộ (cập nhật state ngay lập tức)
    // Sử dụng extraReducers cho createAsyncThunk (xử lý API bất đồng bộ)  
    // câu hỏi đặt ra fetchProducts cũng cập nhật sao không cho vào reducers
    // ====> vì ruducers chỉ xử lý action mà tôi đã tạo trong createSlite
    // Ở đây, setPageHome là một hành động đơn giản, nhận dữ liệu từ dispatch(setPageHome(2)) và cập nhật ngay lập tức.
    // còn fetchProducts không biết dữ liệu về lúc nào do createThunk tạo 3 action 
    // Nếu fetchProductsB đưa vào reducers, Redux sẽ không thể xử lý được trạng thái pending và rejected.
    reducers: {},
    extraReducers: (builder) => {
        builder

        // Product
            // tự động tạo action.type => products/fecthProductsB/pending 
            .addCase(fetchProductsB.pending, (state) => {
                state.status = "loading";
            })            
            .addCase(fetchProductsB.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.categories = action.payload.categories;
                state.products = action.payload.products;
                
            })
            .addCase(fetchProductsB.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default productSlice.reducer;
