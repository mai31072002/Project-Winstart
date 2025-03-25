import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryProducts } from "../reducer/categorySlice";

const useFetchProducts = (category_slug) => {
    const dispatch = useDispatch();
    
    // const { products, status, totalPages, message, currentPage, filters } = useSelector((state) => state.productcategory);
    const products = useSelector((state) => state.productcategory.items);
    const currentPage = useSelector((state) => state.productcategory.currentPage);
    const totalPages = useSelector((state) => state.productcategory.totalPages);
    const filters = useSelector((state) => state.productcategory.filters);
    const message = useSelector((state) => state.productcategory.error);
    const status = useSelector((state) => state.productcategory.status);
    // console.log(`Danh sách sản phẩm`, products);

    useEffect(() => {
        if (category_slug) {
            dispatch(fetchCategoryProducts({ category_slug, page: currentPage, filters }));
        }
    }, [dispatch, category_slug, currentPage, filters]);

    return { products, status, totalPages, message, currentPage, filters };
};

export default useFetchProducts;
