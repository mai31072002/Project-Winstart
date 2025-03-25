import React, {useEffect} from "react";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, Layout, Row, Col, Checkbox, Card, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
// import useFecthCategorys from "../redux/Hook/useFecthCategory";
import { fetchCategoryProducts, setcatpage, setByPrice } from "../redux/reducer/categorySlice";

const CategoryProduct = () => {
    const { Meta } = Card;
    const { Content, Sider } = Layout;
    const navigate = useNavigate();
    const { category_slug } = useParams();
    const dispatch = useDispatch();
    // const { productCategory } = useFecthCategorys(category_slug);
    // console.log(`sản phẩm cat`, productCategory);
    

    // Gọi API để lấy sản phẩm theo danh mục khi component mount
    useEffect(() => {
        if (category_slug) {
            dispatch(fetchCategoryProducts(category_slug));
            dispatch(setcatpage(1));
        }
    }, [dispatch, category_slug]);

    const HandlePageChange = (page) => {
        dispatch(setcatpage(page));
        window.scrollTo(0, 0);
    }

    const handleCheckPrice = (value) => {
        // console.log(`giá`, value);
        dispatch(setByPrice(value));
    }

    const productCategory = useSelector((state) => state.productcategory.items);
    const currentpage = useSelector((state) => state.productcategory.currentpage);
    const limit = useSelector((state) => state.productcategory.limit);
    const startIndex = (currentpage -1) * limit;
    const endIndex = startIndex + limit;
    const PaginationProduct =  productCategory.slice(startIndex, endIndex);
    
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
                <Row gutter={[16]}>
                    <Col xs={24} sm={24} md={6}>
                        <Sider width={250} style={{ background: "#f0f2f5", padding: "20px" }}>
                            <h3>Lọc theo giá</h3>
                            <Checkbox.Group
                                options={[
                                    { label: "Dưới 10.000.000 đ", value: "price-1" },
                                    { label: "10.000.000 - 20.000.000 đ", value: "price-15" },
                                    { label: "20.000.000 - 30.000.000 đ", value: "price-25" },
                                    { label: "Trên 30.000.000 đ", value: "price-30" },
                                ]}
                                onChange={handleCheckPrice}
                            />
                        </Sider>
                    </Col>
                    <Col xs={24} sm={24} md={18}>
                        <Content style={{ padding: "0 20px" }}>
                            <Row gutter={[16, 16]}>
                                {PaginationProduct.map((product) => (
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
                                current={currentpage}
                                pageSize={limit}
                                total={productCategory.length}
                                onChange={HandlePageChange}
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
