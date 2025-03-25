import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./redux/Hook/ScrollToTop";
import HandleHeader from "./page/header";
import HandleFooter from "./page/footer";
import Home from "./page/Home";
import SearchPage from "./page/searchPage";
import CategoryProduct from "./page/catProduct";
import SingleProduct from "./page/SingleProduct";
import NotFoundPage from "./page/notFoundPage";

const App = () => {
    return (
        <Router>
            <div style={{ maxWidth: 1200, margin: "auto", padding: "20px" }}>
                <ScrollToTop />
                <HandleHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search"  element={<SearchPage />}/>
                        <Route path="/categories/:category_slug" element={<CategoryProduct />} />
                        <Route path="/product/:id" element={<SingleProduct />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
                <HandleFooter /> 
            </div>
        </Router>
    );
};

export default App;
