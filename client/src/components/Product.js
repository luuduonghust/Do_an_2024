import React, { useState, memo } from "react";
import { formatMoney, renderStarFromNumber } from "../ultils/helper";
import SelectOption from "./SelectOption";
import icons from "../ultils/icons";
// import { Link } from "react-router-dom";
import path from "../ultils/path";
import withBaseComponent from "hocs/withBaseComponent";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { BsFillCartCheckFill, BsFillCartPlusFill } from "react-icons/bs";
import { showModal } from "store/app/appSlice";
import { DetailProduct } from "pages/public";
import { toast } from "react-toastify";
import { getCurrent } from "store/user/asyncActions";
import { createSearchParams } from "react-router-dom";
import { apiUpdateCart, apiUpdateWishlist } from "apis";
import clsx from "clsx";

const { FaEye, BsFillSuitHeartFill } = icons;

const Product = ({
  productData,
  normal,
  dispatch,
  location,
  pid,
  className,
  navigate,
}) => {
  const { current } = useSelector((state) => state.user);
  const [isShow, setIsShow] = useState(false);

  const handleClickOptions = async (e, flag) => {
    e.stopPropagation();
    if (flag === "CART") {
      if (!current)
        return Swal.fire({
          title: "Almost...",
          text: "Please login first!",
          icon: "info",
          cancelButtonText: "Not now!",
          showCancelButton: true,
          confirmButtonText: "Go login page",
        }).then(async (rs) => {
          if (rs.isConfirmed)
            navigate({
              pathname: `/${path.LOGIN}`,
              search: createSearchParams({
                redirect: location.pathname,
              }).toString(),
            });
        });
      const response = await apiUpdateCart({
        pid: productData?._id,
        color: productData?.color,
        quantity: 1,
        price: productData?.price,
        title: productData?.title,
        thumbnail: productData?.images?.[0],
      });
      console.log(productData);
      if (response.success) {
        toast.success(response.mes);
        dispatch(getCurrent());
      } else toast.error(response.mes);
    }
    if (flag === "WISHLIST") {
      const response = await apiUpdateWishlist(pid);
      if (response.success) {
        dispatch(getCurrent());
        toast.success(response.mes);
      } else toast.error(response.mes);
    }
    if (flag === "QUICK_VIEW") {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <DetailProduct
              data={{ pid: productData?._id, category: productData?.category }}
              isQuickView
            />
          ),
        })
      );
    }
  };

  return (
    <div className={clsx("w-full col-span-1 text-base px-[10px]", className)}>
      <div
        onClick={(e) =>
          navigate(
            `/${productData?.category?.toLowerCase()}/${productData?._id}/${
              productData?.title
            }`
          )
        }
        className="w-full border p-[15px] flex flex-col items-center"
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsShow(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsShow(false);
        }}
      >
        <div className="w-full relative">
          {isShow && (
            <div className="absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2 animate-slide-top">
              <span
                title="Quick view"
                onClick={(e) => handleClickOptions(e, "QUICK_VIEW")}
              >
                <SelectOption icon={<FaEye />} />
              </span>
              {/* <SelectOption icon={<IoIosMenu />} /> */}
              {current?.cart?.some(
                (el) => el.product === productData._id.toString()
              ) ? (
                <span title="Added to Cart">
                  <SelectOption icon={<BsFillCartCheckFill color="green" />} />
                </span>
              ) : (
                <span
                  title="Add to Cart"
                  onClick={(e) => handleClickOptions(e, "CART")}
                >
                  <SelectOption icon={<BsFillCartPlusFill />} />
                </span>
              )}
              <span
                title="Add to Wishlist"
                onClick={(e) => handleClickOptions(e, "WISHLIST")}
              >
                <SelectOption
                  icon={
                    <BsFillSuitHeartFill
                      color={
                        current?.wishlist?.some((i) => i._id === pid)
                          ? "red"
                          : "gray"
                      }
                    />
                  }
                />
              </span>
            </div>
          )}
          {!normal && (
            <img
              src={productData?.images?.[0] || ""}
              alt=""
              className="w-full h-[243px] object-contain flex"
            />
          )}
        </div>
        <div className="flex flex-col gap-1 mt-[15px] w-full items-start">
          <span className="flex h-4 ">
            {renderStarFromNumber(productData?.totalRatings, 14)?.map(
              (el, index) => (
                <span key={index}>{el} </span>
              )
            )}
          </span>
          <span className="line-clamp-1">{productData?.title}</span>
          <span>{`${formatMoney(productData?.price)} VNĐ`} </span>
        </div>
      </div>
    </div>
  );
};

export default withBaseComponent(memo(Product));
