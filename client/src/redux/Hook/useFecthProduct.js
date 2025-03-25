import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsB } from "../reducer/productSlice";

const useFetchProducts = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.products.categories);
    const products = useSelector((state) => state.products.products);
    const status = useSelector((state) => state.products.status);
    // console.log(`sản phẩm`, products);
    // console.log(`danh mục list`, categories);
    
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProductsB()); 
        } 
    }, [dispatch, status]);

    return { categories, products, status };
};

export default useFetchProducts;
