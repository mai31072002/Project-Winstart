import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Image, Row, Col, Breadcrumb, Divider, Card, Spin, Button, Modal } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { fetchSingleProducts, fetchRelatedProducts } from "../redux/reducer/singleSlice";

const BreadcrumbNav = ({ category }) => {
    const navigate = useNavigate();
    return (
        <Breadcrumb
            items={[
                {
                    title: (
                        <span onClick={() => navigate("/")} style={{ cursor: "pointer", color: "blue" }}>
                            <HomeOutlined /> Trang chủ
                        </span>
                    ),
                },
                { title: <span style={{ textTransform: "capitalize" }}>{category}</span> }
            ]}
            style={{ padding: "20px 20px 0" }}
        />
    );
};
const RelatedProducts = ({ relatedStatus }) => {
    const navigate = useNavigate();
    return (
        <Row gutter={[16, 16]}>
            {relatedStatus.map((product) => (
                <Col span={6} xs={12} sm={12} md={8} lg={6} key={product.id}>
                    <Card
                        hoverable
                        cover={<img alt={product.title} src={product.thumbnail} />}
                        onClick={() => {
                            navigate(`/product/${product.id}`);
                            window.scrollTo(0, 0); // Cuộn lên đầu khi đổi sản phẩm
                        }}
                    >
                        <Card.Meta title={product.title} description={`Giá: ${product.price.toLocaleString()} đ`} />
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

const SingleProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector((state) => state.single.item);
    const relatedProducts = useSelector((state) => state.single.relatedItems);
    const status = useSelector((state) => state.single.status);
    const relatedStatus = useSelector((state) => state.single.relatedStatus);
    console.log(`relatedStatus : `, relatedStatus);
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch sản phẩm theo ID (Chạy 1 lần khi `id` thay đổi)
    useEffect(() => {
        dispatch(fetchSingleProducts(id));
    }, [dispatch, id]);

    // Fetch sản phẩm liên quan khi đã có `product.category`
    useEffect(() => {
        if (product?.category_slug) {
            console.log(`product.category : `, product.category_slug);
            dispatch(fetchRelatedProducts(product.category_slug));
        }
    }, [dispatch, product?.category_slug]);

    if (status === "loading") return <Spin />;
    if (status === "failed") return <p style={{ textAlign: "center" }}>Không thể tải sản phẩm</p>;
    if (!product) return <h1 style={{ textAlign: "center" }}>Sản phẩm không tồn tại</h1>;

    return (
        <main>
            <BreadcrumbNav category={product.category} />

            <Row gutter={[32, 32]} style={{ padding: "20px 0" }}>
                <Col span={12}>
                    <Image width="100%" src={product.thumbnail} style={{ borderRadius: 10 }} />
                </Col>
                <Col span={12}>
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                    <p style={{ fontSize: "20px" }}>
                        <span style={{ color: "red", fontSize: "24px", fontWeight: "bold", marginRight: "10px" }}>
                            {product.price.toLocaleString()} đ
                        </span>
                    </p>
                    <Button style={{ marginRight: "10px", background: "#ffc069" }} onClick={() => setIsModalOpen(true)}>
                        Thông tin thanh toán
                    </Button>
                    <Modal title="Thông tin thanh toán" open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
                        <Image width="100%" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNuLkhPGNWIidkCJNKzzUm7mw3b2e4F9sUQA&s" style={{ borderRadius: 10 }} />
                    </Modal>

                    <div style={{ display: "flex", flexDirection: "column", marginTop: 10 }}>
                        <h4>Kích thước:</h4>
                        <span>Chiều cao: {product.width}</span>
                        <span>Chiều rộng: {product.height}</span>
                        <span>Độ sâu: {product.depth}</span>
                    </div>
                </Col>
            </Row>

            <Divider orientation="left" plain style={{ fontWeight: "bold", fontSize: "18px" }}>
                Mô tả sản phẩm
            </Divider>
            <p>{product.description}</p>

            <div style={{ margin: "30px 0" }}>
                <h2>Sản phẩm liên quan</h2>
                <RelatedProducts relatedStatus={relatedProducts} />
                {/* {relatedStatus === "loading" ? <Spin /> : relatedProducts.map((p) => <p key={p.id}>{p.title}</p>)} */}
            </div>
        </main>
    );
};

export default SingleProduct;

