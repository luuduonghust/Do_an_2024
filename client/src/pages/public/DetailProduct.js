import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { apiGetProduct, apiGetProducts } from "../../apis/product";
import Breadcrumb from "../../components/Breadcrumbs";
// import ReactImageMagnify from "react-image-magnify";
import clsx from "clsx";
import Swal from "sweetalert2";
import path from "ultils/path";
import { toast } from "react-toastify";
import { apiUpdateCart } from "apis";
import { createSearchParams } from "react-router-dom";
import {
  formatMoney,
  fotmatPrice,
  renderStarFromNumber,
} from "../../ultils/helper";
import DOMPurify from "dompurify";
import {
  Button,
  SelectQuantity,
  ProductExtraInfoItem,
  ProductInfomation,
  Customslider,
} from "../../components";
import { productExtraInfomation } from "../../ultils/constant";
import { useSelector } from "react-redux";
import { getCurrent } from "store/user/asyncActions";
import { useDispatch } from "react-redux";

const DetailProduct = ({ isQuickView, data, location, navigate }) => {
  // console.log(dispatch);
  const dispatch = useDispatch();
  const [currentProduct, setCurrentProduct] = useState({
    title: "",
    images: [],
    price: "",
    color: "",
  });

  const { current } = useSelector((state) => state.user);
  const params = useParams();
  const [update, setUpdate] = useState(false);
  const titleRef = useRef();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [pid, setPid] = useState(null);

  useEffect(() => {
    if (data) {
      setPid(data.pid);
      setCategory(data.category);
    } else if (params && params.pid) {
      setPid(params.pid);
      setCategory(params.category);
    }
  }, [data, params]);
  const fetchProducts = async () => {
    const response = await apiGetProducts({ category });
    if (response.success) setRelatedProducts(response.products);
  };
  const fetchProductData = async () => {
    const response = await apiGetProduct(pid);
    if (response.success) {
      setProduct(response.productData);
    }
  };
  useEffect(() => {
    setCurrentProduct({
      title: product?.title,
      color: product?.color,
      images: product?.images?.[0] || [],
      price: product?.price,
    });
  }, []);
  const handleQuantity = useCallback(
    (number) => {
      if (!Number(number) || Number(number) < 1) {
        return;
      } else {
        setQuantity(number);
      }
    },
    [quantity]
  );
  const handleChangeQuantity = useCallback(
    (flag) => {
      if (flag === "minus" && quantity === 1) return;
      if (flag === "minus") setQuantity((prev) => +prev - 1);
      if (flag === "plus") setQuantity((prev) => +prev + 1);
    },
    [quantity]
  );
  const rerender = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  useEffect(() => {
    if (pid) {
      fetchProductData();
      fetchProducts();
    }
    titleRef?.current?.scrollIntoView({ block: "center" });
    window.scrollTo(0, 0);
  }, [pid]);
  const handleAddToCart = async () => {
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
      pid,
      color: currentProduct.color || product?.color,
      quantity,
      price: currentProduct.price || product.price,
      thumbnail: currentProduct.images?.[0] || product.images?.[0],
      title: currentProduct.title || product.title,
    });
    const payload = {
      pid,
      color: currentProduct.color || product?.color,
      quantity,
      price: currentProduct.price || product.price,
      thumbnail: currentProduct.images?.[0] || product.images?.[0],
      title: currentProduct.title || product.title,
    };
    console.log(payload);
    if (response.success) {
      toast.success(response.mes);
      dispatch(getCurrent());
    } else toast.error(response.mes);
  };
  return (
    <div className={clsx("w-full")}>
      {!isQuickView && (
        <div className="h-[81px] flex justify-center items-center bg-gray-100">
          <div ref={titleRef} className="w-main">
            <h3 className="font-semibold">
              {currentProduct.title || product?.title}
            </h3>
            <Breadcrumb
              title={currentProduct.title || product?.title}
              category={category}
            />
          </div>
        </div>
      )}
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          "bg-white m-auto mt-4 flex",
          isQuickView
            ? "max-w-[900px] gap-16 p-8 max-h-[80vh] overflow-y-auto"
            : "w-main"
        )}
      >
        <div
          className={clsx("flex flex-col gap-4 w-2/5", isQuickView && "w-1/2")}
        >
          <img
            src={product?.images}
            alt="product"
            className="h-[458px] w-[458px] object-cover "
          />
        </div>
        <div
          className={clsx(
            "w-2/5 pr-[24px] flex flex-col gap-4",
            isQuickView && "w-1/2"
          )}
        >
          <h2 className="text-[30px] font-semibold">
            {`${formatMoney(fotmatPrice(product?.price))} VNĐ`}{" "}
          </h2>
          <span className="text-sm text-main">{`In stock: ${product?.quantity}`}</span>

          <div className="flex items-center gap-1">
            {renderStarFromNumber(product?.totalRatings)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
            <span className="text-sm text-main italic">{`(Sold: ${product?.sold} pieces)`}</span>
          </div>
          <ul className="list-square text-sm text-gray-500 pl-4">
            <div
              className="text-sm line-clamp-[10] mb-8"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product?.description),
              }}
            ></div>
          </ul>
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <span className="font-semibold">Quantity</span>
              <SelectQuantity
                quantity={quantity}
                handleQuantity={handleQuantity}
                handleChangeQuantity={handleChangeQuantity}
              />
            </div>
            <Button handleOnClick={handleAddToCart} fw>
              Add to Cart
            </Button>
          </div>
        </div>
        <div className="flex-2">
          {" "}
          {productExtraInfomation.map((el) => (
            <ProductExtraInfoItem
              key={el.id}
              title={el.title}
              icon={el.icon}
              sub={el.sub}
            />
          ))}
        </div>
      </div>
      {!isQuickView && (
        <div className="w-main m-auto mt-8">
          <ProductInfomation
            totalRatings={product?.totalRatings}
            ratings={product?.ratings}
            nameProduct={product?.title}
            pid={product?._id}
            rerender={rerender}
          />
        </div>
      )}
      {!isQuickView && (
        <div className="w-main m-auto mt-8">
          <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
            OTHER CUSTOMER ALSO LIKED
          </h3>
          <Customslider products={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default DetailProduct;
