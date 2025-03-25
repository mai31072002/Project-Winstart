// Tạo kho lưu trữ configureSrote <react toolkit> và xuất đi
// Tự đọng tạo react devtool để kiểm tra trạng thái kho lưu trữ khi phát  triển

import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducer/productSlice"; // Đúng đường dẫn của file slice
import searchReducer from "./reducer/searchSlice";
import categoryReducer from "./reducer/categorySlice";
import singleReducer from "./reducer/singleSlice";

const store = configureStore({
  reducer: {
    products: productReducer, 
    // productcategory: productcategoryReducer,
    productcategory: categoryReducer,
    search: searchReducer,
    single: singleReducer,
  },
});

export default store;
