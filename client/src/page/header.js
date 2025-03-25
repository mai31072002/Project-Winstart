import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import FilterSearch from "../component/Search";
import useFecthProduct from "../redux/Hook/useFecthProduct";

const HandleHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { categories } = useFecthProduct();
  // console.log(`header category`, categories);
  
  // Giải pháp trong trường hợp có quá nhiều sản phẩm phải reload để lọc sản lấy danh mục
  // API có cung cấp endpoint riêng để lấy danh mục không
  
  const [current, setCurrent] = useState(location.pathname);

  // Tạo menu danh mục sản phẩm
  const categoryMenu = categories.map((category) => ({
    label: category.category.charAt(0).toUpperCase() + category.category.slice(1), // Chữ cái đầu in hoa
    key: `/categories/${category.category_slug.toLocaleLowerCase()}`,
  }));

  // Khai báo danh sách menu chính
  const menuItems = [
    { label: "Trang chủ", key: "/" },
    { label: "Giới thiệu", key: "/about" },
    {
      label: "Sản phẩm",
      key: "Submenu",
      children: categoryMenu,
    },
    { label: "Dự án", key: "/project" },
    { label: "Tin tức", key: "/news" },
    { label: "Khuyến mãi", key: "/sale" },
  ];

  // Cập nhật trạng thái `current` khi đường dẫn thay đổi
  useEffect(() => {
    setCurrent(location.pathname);
  }, [location.pathname]);

  // Xử lý sự kiện click vào menu
  const onClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
    navigate(e.key);
  };

  return (
    <>
      <FilterSearch />
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={menuItems}
      />
    </>
    
  );
};

export default HandleHeader;
