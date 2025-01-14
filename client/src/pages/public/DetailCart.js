// import Button from "components";
import React from "react";
import Swal from "sweetalert2";
import { formatMoney } from "ultils/helper";
import path from "ultils/path";
import { withBaseComponent } from "components";
import { useSelector } from "react-redux";
import OrderItem from "components/OrderItem";
import { Button } from "../../components";
import { createSearchParams } from "react-router-dom";

const DetailCart = ({ location, navigate }) => {
  const { currentCart, current } = useSelector((state) => state.user);
  console.log(current);
  const handleSubmit = () => {
    if (!current?.address)
      return Swal.fire({
        icon: "info",
        title: "Almost!",
        text: "Please update your address before checkout.",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Go update",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed)
          navigate({
            pathname: `/${path.MEMBER}/${path.PERSONAL}`,
            search: createSearchParams({
              redirect: location.pathname,
            }).toString(),
          });
      });
    else window.open(`/${path.CHECKOUT}`, "_blank");
  };
  return (
    <div className="w-full">
      <div className="h-[81px] flex justify-center items-center bg-gray-100">
        <div className="w-main text-center">
          <h3 className="font-semibold text-2xl uppercase">My Cart</h3>
        </div>
      </div>

      <div className="w-main mx-auto my-8">
        <div className="bg-gray-200 font-bold py-3 grid grid-cols-10">
          <span className="col-span-6 text-center">Products</span>
          <span className="col-span-1 text-center">Quantity</span>
          <span className="col-span-3 text-center">Price</span>
        </div>
        {currentCart?.map((el) => (
          <OrderItem
            key={el._id}
            dfQuantity={el.quantity}
            color={el.color}
            title={el.product?.title}
            thumbnail={
              el.product?.images?.[0] ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_GOhUXbTBGraHVj2z0UFnXvCcTRBsY_hXBg&s"
            }
            price={el.product?.price}
            pid={el.product?._id}
          />
        ))}
      </div>

      <div className="w-main mx-auto mb-12">
        <div className="flex flex-col items-end gap-3">
          <span className="flex items-center gap-8 text-sm">
            <span>Subtotal:</span>
            <span className="text-main font-bold">{`${formatMoney(
              currentCart?.reduce(
                (sum, el) => +el.product?.price * el.quantity + sum,
                0
              )
            )} VND`}</span>
          </span>
          <span className="text-xs italic">
            Shipping, taxes, and discounts calculated at checkout
          </span>
          <Button handleOnClick={handleSubmit}>Checkout</Button>
          {/* <button className="px-4 py-2 rounded-md text-white bg-main font-semibold my-2 outline-none w-fit">
            Checkout
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default withBaseComponent(DetailCart);
