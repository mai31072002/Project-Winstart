import React, { useEffect } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Breadcrumb, Layout, Row, Col, Checkbox, Card, Pagination, Spin } from "antd";
import { useDispatch } from "react-redux";
import { setPage, setFilters } from "../redux/reducer/categorySlice";
import useFetchProducts from "../redux/Hook/useFecthCategory";

const CategoryProduct = () => {
    const { Meta } = Card;
    const { Content, Sider } = Layout;
    const navigate = useNavigate();
    const { category_slug } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();

    // Sử dụng custom hook để lấy dữ liệu
    const { products, status, totalPages, message, currentPage, filters } = useFetchProducts(category_slug);

    // Khi thay đổi danh mục, reset bộ lọc và trang về mặc định
    useEffect(() => {
        dispatch(setPage(1)); 
        dispatch(setFilters([]));
    }, [dispatch, category_slug, location.pathname]);

    // Xử lý phân trang
    const handlePageChange = (page) => {
        dispatch(setPage(page));
        window.scrollTo(0, 0);
    };

    // Xử lý lọc sản phẩm theo giá (chỉ chọn một giá trị)
    const handleCheckPrice = (selectedValues) => {
        dispatch(setFilters(selectedValues));
        dispatch(setPage(1));
    };

    return (
        <main>
            <Breadcrumb
                items={[
                    { title: <span onClick={() => navigate("/")} style={{ cursor: "pointer", color: "blue" }}><HomeOutlined /> Trang chủ</span> },
                    { title: <span style={{ textTransform: "capitalize" }}>danh mục</span> },
                ]}
                style={{ padding: "20px 20px 0" }}
            />
            <h2 align="center" style={{ textTransform: "uppercase" }}>Danh mục</h2>
            <Layout style={{ padding: "20px 0" }}>
                <Row gutter={[16]} style={{padding: "0 0 40px", width: "100%"}}>
                    <Col xs={24} sm={24} md={6} lg={6}>
                        <Sider width={250} style={{ background: "#f0f2f5", padding: "20px" }}>
                            <h3>Lọc theo giá</h3>
                            <Checkbox.Group
                                options={[
                                    { label: "Dưới 10.000 đ", value: "0-10" },
                                    { label: "10.000 - 50.000 đ", value: "10-50" },
                                    { label: "50.000 - 100.000 đ", value: "50-100" },
                                    { label: "Trên 100.000 đ", value: "101" },
                                ]}
                                onChange={handleCheckPrice}
                                value={filters}
                            />
                        </Sider>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={18}>
                        <Content style={{ padding: "0 20px" }}>
                            <Row gutter={[16, 16]}>
                                {products.length === 0 && <p style={{ color: "gray" }}>Không có sản phẩm nào.</p>}
                                {status === "loading" && <Spin />}
                                {status === "failed" && <>{message}</>}
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

export default CategoryProduct;

