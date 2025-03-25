import { Card, Col, Row } from "antd";
import { EnvironmentOutlined, PhoneOutlined, MailOutlined, GlobalOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function HendleFooter() {
    const data = [
      {
        title: "WINSTART VIỆT NAM",
        content: [
          { text: "Địa chỉ kho: Lô C, KCN Bình Phú, Thạch Thất, Hà Nội", icon: <EnvironmentOutlined style={{ color: "#ffa940" }} /> },
          { text: "Hotline: 0359.939.569 - 0888.223.286", icon: <PhoneOutlined style={{ color: "#ffa940" }} /> },
          { text: "Email: winstartvietnam@gmail.com", icon: <MailOutlined style={{ color: "#ffa940" }} /> },
          { text: "Website: https://winstart.vn/", icon: <GlobalOutlined style={{ color: "#ffa940" }} />, link: "/" }
        ],
      },
      {
        title: "SẢN PHẨM NỔI BẬT",
        content: [
          { text: "Sản phẩm 1", icon: <CheckCircleOutlined style={{ color: "#ffa940" }} /> },
          { text: "Sản phẩm 2", icon: <CheckCircleOutlined style={{ color: "#ffa940" }} /> },
          { text: "Sản phẩm 3", icon: <CheckCircleOutlined style={{ color: "#ffa940" }} /> },
          { text: "Sản phẩm 4", icon: <CheckCircleOutlined style={{ color: "#ffa940" }} /> },
        ],
      },
      {
        title: "Hỗ Trợ Khách Hàng",
        content: [
          { text: "Chính sách bảo hành",  icon: <CheckCircleOutlined style={{ color: "#ffa940" }} /> },
          { text: "Chính sách đổi trả",  icon: <CheckCircleOutlined style={{ color: "#ffa940" }} /> },
          { text: "Hướng dẫn mua hàng",  icon: <CheckCircleOutlined style={{ color: "#ffa940" }} /> },
          { text: "Câu hỏi thường gặp",  icon: <CheckCircleOutlined style={{ color: "#ffa940" }} /> },
        ],
      },
      {
        title: "BẢN ĐỒ",
        content: [
          { text: "Vị trí công ty" },
          { text: "Google Maps" },
        ],
      },
    ];
  
    return (
      <footer>
        <div style={{background: "#ffffff", width: "100%"}}>
            <Row justify="space-between" gutter={[0, 16]}>
              {data.map((item, index) => (
                <Col key={index} xs={24} sm={12} md={6} lg={6}>
                  <Card title={item.title} variant="borderless" style={{ boxShadow: "none" }}>
                    <ul style={{ margin: "0", padding: "0", listStyle: "none" }}>
                      {item.content.map((entry, idx) => (
                        <li key={idx} style={{ padding: "4px 0", display: "flex", alignItems: "center", gap: "8px" }}>
                          {entry.icon && <span>{entry.icon}</span>}
                          {entry.link ? (
                            <Link to={entry.link} style={{ color: "#333", textDecoration: "none" }}>
                              {entry.text}
                            </Link>
                          ) : (
                            entry.text
                          )}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Col>
              ))}
            </Row>
        </div>
      </footer>
    );
  }
export default HendleFooter;