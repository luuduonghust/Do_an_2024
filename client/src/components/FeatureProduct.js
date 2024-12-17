import React, { useState, useEffect } from "react";
import ProductCart from "./ProductCart";
import { apiGetProducts } from "../apis";

const FeatureProduct = () => {
  const [products, setProducts] = useState(null);
  const fetchProducts = async () => {
    const response = await apiGetProducts({ limit: 9 });
    if (response.success) {
      setProducts(response.products);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="w-full">
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
        FEATURED PRODUCT
      </h3>
      <div className="flex flex-wrap mt-[15px] mx-[-10px]">
        {products?.map((el) => (
          <ProductCart
            key={el._id}
            pid={el._id}
            image={el.images}
            title={el.title}
            totalRatings={el.totalRatings}
            price={el.price}
            {...el}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureProduct;
