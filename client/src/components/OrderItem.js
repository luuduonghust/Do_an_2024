import React, { useEffect, useState } from "react";
import { formatMoney } from "ultils/helper";
import { updateCart } from "store/user/userSlice";
import SelectQuantity from "./SelectQuantity";
import withBaseComponent from "hocs/withBaseComponent";
const OrderItem = ({
  dispatch,
  color,
  dfQuantity = 1,
  price,
  title,
  thumbnail,
  pid,
}) => {
  const handleChangeQuantity = (flag) => {
    if (flag === "minus" && quantity === 1) return;
    if (flag === "minus") setQuantity((prev) => +prev - 1);
    if (flag === "plus") setQuantity((prev) => +prev + 1);
  };
  // const [quantity, setQuantity] = useState(() => dfQuantity);
  const [quantity, setQuantity] = useState(() => {
    // Lấy quantity từ localStorage, nếu không có thì dùng giá trị mặc định (dfQuantity)
    const savedQuantity = localStorage.getItem(`cart-quantity-${pid}`);
    return savedQuantity ? parseInt(savedQuantity, 10) : dfQuantity;
  });
  const handleQuantity = (number) => {
    if (+number > 1) setQuantity(number);
  };
  useEffect(() => {
    localStorage.setItem(`cart-quantity-${pid}`, quantity);
    dispatch(updateCart({ pid, quantity, color }));
  }, [quantity]);
  console.log(quantity);
  return (
    <div className="w-main mx-auto border-b font-bold py-3 grid grid-cols-10">
      <span className="col-span-6 w-full text-center">
        <div className="flex gap-2 px-4 py-3">
          <img src={thumbnail} alt="thumb" className="w-28 h-28 object-cover" />
          <div className="flex flex-col items-start gap-1">
            <span className="text-sm text-main">{title}</span>
            <span className="text-[10px] font-main">{color}</span>
          </div>
        </div>
      </span>
      <span className="col-span-1 w-full text-center">
        <div className="flex items-center h-full">
          <SelectQuantity
            quantity={quantity}
            handleQuantity={handleQuantity}
            handleChangeQuantity={handleChangeQuantity}
          />
        </div>
      </span>
      <span className="col-span-3 w-full h-full flex items-center justify-center text-center">
        <span className="text-lg">
          {formatMoney(price * quantity) + " VND"}
        </span>
      </span>
    </div>
  );
};

export default withBaseComponent(OrderItem);
