import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategoryProducts = createAsyncThunk(
    "productcategory/fetchCategoryProducts",
    // tham số đầu vào
    async (category_slug, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/products/${category_slug}`);
            // console.log(`sp cat`, response.data);
            
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
    name: "productcategory",
    initialState: {
        items: [],
        status: "idle",
        currentpage: 1,
        limit: 8,
        error: null,
        selectCategory: null,
    },

    // Sử dụng reducers cho action đồng bộ (cập nhật state ngay lập tức)
    // Sử dụng extraReducers cho createAsyncThunk (xử lý API bất đồng bộ)  
    // câu hỏi đặt ra fetchProducts cũng cập nhật sao không cho vào reducers
    // ====> vì ruducers chỉ xử lý action mà tôi đã tạo trong createSlite
    // Ở đây, setPageHome là một hành động đơn giản, nhận dữ liệu từ dispatch(setPageHome(2)) và cập nhật ngay lập tức.
    // còn fetchProducts không biết dữ liệu về lúc nào do createThunk tạo 3 action 
    // Nếu fetchProductsB đưa vào reducers, Redux sẽ không thể xử lý được trạng thái pending và rejected.
    reducers: {
        setcatpage: (state, action) => {
            state.currentpage = action.payload;
        },
        setByPrice: (state, action) => {
            state.selectCategory = action.payload;
            state.currentpage = 1;
        }
    },
    extraReducers: (builder) => {
        builder

        // Product
            // tự động tạo action.type => products/fecthProductsB/pending 
            .addCase(fetchCategoryProducts.pending, (state) => {
                state.status = "loading";
            })            
            .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
                
            })
            .addCase(fetchCategoryProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const { setcatpage, setByPrice } = productSlice.actions;
export default productSlice.reducer;
