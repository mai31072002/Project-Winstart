import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Row, Col, Card, Pagination, Spin } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { setPage } from "../redux/reducer/searchSlice";
import useFetchSearchProducts from "../redux/Hook/useFetchSearch";
// import useFetchSearchProducts from "../redux/Hook/useSingleProduct";

const SearchPage = () => {
    const { Meta } = Card;
    const { Content } = Layout;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("query");

    // Sử dụng custom hook
    const { products, status, totalPages, currentPage } = useFetchSearchProducts(searchQuery);
    console.log(`Danh sách sản phẩm tìm kiếm:`, products);
    
    // Reset về trang 1 khi tìm kiếm thay đổi
    useEffect(() => {
        dispatch(setPage(1));
    }, [dispatch, searchQuery]);

    const handlePageChange = (page) => {
        dispatch(setPage(page));
        window.scrollTo(0, 0);
    };

    return (
        <main>
            <Breadcrumb
                items={[
                    { title: <span onClick={() => navigate("/")} style={{ cursor: "pointer", color: "blue" }}><HomeOutlined /> Trang chủ</span> },
                    { title: <span>Tìm kiếm: {searchQuery}</span> },
                ]}
                style={{ padding: "20px 20px 0" }}
            />
            <h2 align="center" style={{ textTransform: "uppercase" }}>Kết quả tìm kiếm</h2>
            <Layout style={{ padding: "20px 0" }}>
                <Row gutter={[16]} style={{ padding: "0 0 40px", width: "100%" }}>
                    <Col xs={24}>
                        <Content style={{ padding: "0 20px" }}>
                            <Row gutter={[16, 16]}>
                                {products.length === 0 && <p style={{ color: "gray" }}>Không có sản phẩm nào.</p>}
                                {status === "loading" && <Spin />}
                                {products.map((product) => (
                                    <Col xs={12} sm={12} md={8} lg={6} key={product.id}>
                                        <Card
                                            hoverable
                                            cover={<img alt={product.title} src={product.thumbnail} />}
                                            onClick={() => navigate(`/product/${product.id}`)}
                                        >
                                            <Meta
                                                title={product.title}
                                                description={<p style={{ color: "red", fontWeight: "bold" }}>Giá: {product.price.toLocaleString()} đ</p>}
                                            />
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                            <Pagination
                                current={currentPage}
                                total={totalPages * 8}
                                pageSize={8}
                                onChange={handlePageChange}
                                style={{ textAlign: "center", marginTop: 20 }}
                            />
                        </Content>
                    </Col>
                </Row>
            </Layout>
        </main>
    );
};

export default SearchPage;
