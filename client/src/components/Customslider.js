import React, { memo } from "react";
import Slider from "react-slick";
import Product from "./Product";
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const Customslider = ({ products, normal }) => {
  return (
    <>
      {products && (
        <Slider {...settings}>
          {products?.map((el, index) => (
            <Product
              key={index}
              pid={el._id}
              productData={el}
              normal={normal}
            />
          ))}
        </Slider>
      )}
    </>
  );
};

export default memo(Customslider);
