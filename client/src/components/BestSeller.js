import React, { useEffect, useState } from "react";

// import { apiGetProducts } from "../apis/product";
import { apiGetProducts } from "../apis/product";
import { Product } from "./";
import Slider from "react-slick";
import { getNewProducts } from "../store/products/asynsAction";
import { useDispatch, useSelector } from "react-redux";

const tabs = [
  { id: 1, name: "best seller" },
  { id: 2, name: "new arrivals" },
];
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState(null);
  // const [newProduct, setNewProduct] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const [products, setProducts] = useState(null);
  const dispath = useDispatch();
  const { newProducts } = useSelector((state) => state.products);
  const fetchProducts = async () => {
    const response = await apiGetProducts({ sort: "-sold" });
    setBestSellers(response.products);
    setProducts(response.products);
  };
  useEffect(() => {
    fetchProducts();
    dispath(getNewProducts());
  }, []);
  useEffect(() => {
    if (activeTab === 1) setProducts(bestSellers);
    if (activeTab === 2) setProducts(newProducts);
  }, [activeTab]);

  return (
    <div>
      <div className="flex text-[20px] gap-8 pb-4 border-b-2 border-main">
        {tabs.map((el) => (
          <span
            onClick={() => setActiveTab(el.id)}
            key={el.id}
            className={`font-semibold cursor-pointer uppercase border-r text-gray-400 ${
              activeTab === el.id ? `text-gray-900` : ""
            }`}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-4 mx-[-10px]">
        <Slider {...settings}>
          {products?.map((el) => (
            <Product key={el.id} productData={el} pid={el._id} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BestSeller;
