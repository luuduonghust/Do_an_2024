import React from "react";
import { renderStarFromNumber, formatMoney } from "../ultils/helper";
import { useNavigate } from "react-router-dom";
const ProductCart = ({ price, totalRatings, image, title, category, pid }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={(e) => navigate(`/${category?.toLowerCase()}/${pid}/${title}`)}
      className="w-1/3 flex-auto cursor-pointer flex px-[10px] mb-[20px]"
    >
      <div className="flex w-full border">
        <img
          src={image}
          alt="products"
          className="w-[90px] object-contain p-4"
        />
        <div className="flex flex-col gap-1 mt-[15px] w-full items-start text-sm">
          <span className="flex h-4 ">
            {renderStarFromNumber(totalRatings, 14)?.map((el, index) => (
              <span key={index}>{el} </span>
            ))}
          </span>
          <span className="line-clamp-1 capitalize">{title}</span>
          <span>{`${formatMoney(price)} VNĐ`} </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
