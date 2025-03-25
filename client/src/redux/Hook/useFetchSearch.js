import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchedProducts } from "../reducer/searchSlice";

const useFetchSearchProducts = (searchQuery) => {
    const dispatch = useDispatch();

    const { products, status, totalPages, currentPage } = useSelector((state) => state.search);

    useEffect(() => {
        if (searchQuery) {
            dispatch(fetchSearchedProducts({ searchItem: searchQuery, page: currentPage }));
        }
    }, [dispatch, searchQuery, currentPage]);

    return { products, status, totalPages, currentPage };
};

export default useFetchSearchProducts;
