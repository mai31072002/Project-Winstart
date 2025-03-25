import React, { useState } from 'react';
import { Input, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

const FilterSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <Space direction="vertical">
            <Search 
                placeholder="Tìm kiếm sản phẩm..."
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                enterButton 
                onSearch={handleSearch}
            />
        </Space>
    );
};

export default FilterSearch;
