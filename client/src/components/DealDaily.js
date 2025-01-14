import React, { useState, memo } from "react";
import icons from "../ultils/icons";
import { apiGetProducts } from "../apis/product";
import { useEffect } from "react";
import { formatMoney, renderStarFromNumber } from "../ultils/helper";
import Counter from "./Counter";
// import { flushSync } from "react-dom";
const { MdOutlineStar, IoIosMenu } = icons;

const DealDaily = () => {
  const [dealDaily, setDealDaily] = useState(null);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [expireTime, setExpireTime] = useState(false);

  let idInterval;
  const fetchDealDaily = async () => {
    const response = await apiGetProducts({
      limit: 1,
      page: Math.round(Math.random() * 10),
    });
    if (response.success) {
      setDealDaily(response.products[0]);
      const h = 24 - new Date().getHours();
      const m = 24 - new Date().getMinutes();
      const s = 24 - new Date().getSeconds();

      setHour(h);
      setMinute(m);
      setSecond(s);
    } else {
      setHour(0);
      setMinute(59);
      setSecond(59);
    }
  };
  // useEffect(() => {
  //   fetchDealDaily();
  // }, []);
  useEffect(() => {
    // if (expireTime) {
    clearInterval(idInterval);
    fetchDealDaily();
    // }
  }, [expireTime]);

  useEffect(() => {
    idInterval = setInterval(() => {
      // console.log(1);
      if (second > 0) setSecond((prev) => prev - 1);
      else {
        if (minute > 0) {
          setMinute((prev) => prev - 1);
          setSecond(59);
        } else {
          if (hour > 0) {
            setHour((prev) => prev - 1);
            setMinute(59);
            setSecond(59);
          } else {
            setExpireTime(!expireTime);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [second, minute, hour, expireTime]);

  return (
    <div className="border w-full flex-auto">
      <div className="flex items-center justify-between p-3 w-full">
        <span className="felx-2 flex justify-center">
          <MdOutlineStar size={20} color="#DD1111" />
        </span>
        <span className="felx-5 font-bold text-[20px] text-center">
          DEAL DAILY
        </span>
        <span className="felx-3"></span>
      </div>
      <div className="w-full flex flex-col items-center px-4 pt-8 gap-2">
        <img
          src={dealDaily?.images?.[0] || ""}
          alt=""
          className="w-full object-contain "
        />
        <span className="flex h-4 ">
          {renderStarFromNumber(dealDaily?.totalRatings)?.map((el, index) => (
            <span key={index}> {el}</span>
          ))}
        </span>
        <span className="line-clamp-1 text-center">{dealDaily?.title}</span>
        <span>{`${formatMoney(dealDaily?.price)} VNĐ`} </span>
      </div>
      <div className="px-4 mt-8">
        <div className="flex justify-center gap-2 items-center mb-4">
          <Counter unit={"Hours"} number={hour} />
          <Counter unit={"Minutes"} number={minute} />
          <Counter unit={"Second"} number={second} />
        </div>
        <button
          type="button"
          className="flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2"
        >
          {/* <IoIosMenu /> */}
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
};

export default memo(DealDaily);
