import React from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { Card, Col, Row, Spin } from "antd";
// import { setPageHome } from "../redux/reducer/productSlice";
import useFetchProducts from "../redux/Hook/useFecthProduct";

const Home = () => {
    const { Meta } = Card;
    const navigate = useNavigate();
    const { products, status } = useFetchProducts();
    

    if (status === "loading") return <Spin />; 
    if (status === "failed") return <p>Failed to fetch products</p>;

    return (
        <main>
            <h2 align="center">Tất cả sản phẩm</h2>
            <Row gutter={[16, 16]} justify="center">
                {products.map((product) => (
                    <Col key={product.id} xs={12} sm={8} md={6} lg={4}>
                        <Card
                            hoverable
                            cover={<img alt={product.title} src={product.thumbnail} />}
                            onClick={() => navigate(`/product/${product.id}`)}
                        >
                            <Meta
                                title={product.title}
                                description={<p style={{ color: "red", fontWeight: "bold" }}>Giá: {product.price} đ</p>}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* <Pagination
                current={currentPageHome}
                pageSize={itemsPerPage}
                total={products.length}
                onChange={(page) => dispatch(setPageHome(page))}
                showQuickJumper={false}
                showSizeChanger={false}
                justify="center"
                style={{ textAlign: "center", marginTop: 20 }}
            /> */}
        </main>
    );
};

export default Home;
