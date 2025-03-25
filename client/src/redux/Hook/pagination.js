import { useState, useMemo } from "react";

const usePagination = (data, itemsPerPage) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Tính toán tổng số trang
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Lấy dữ liệu hiển thị theo trang
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return data.slice(startIndex, startIndex + itemsPerPage);
    }, [data, currentPage, itemsPerPage]);

    // Hàm đổi trang
    const onPageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0); // Cuộn lên đầu trang khi chuyển trang
    };

    return { paginatedData, currentPage, totalPages, onPageChange };
};

export default usePagination;
