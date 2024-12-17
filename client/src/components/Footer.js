import React, { memo } from "react";
import icons from "../ultils/icons";
const { IoMailOpenSharp } = icons;
const Footer = () => {
  return (
    <div className="w-full">
      <div className="h-[103px] w-full bg-main flex items-center justify-center">
        <div className=" w-main flex items-center justify-center ">
          <div className="flex flex-col flex-1">
            <span className="text-[20px] text-gray-100 ">
              Sign up to Newsletter{" "}
            </span>
            <small className="text-[13px] text-gray-300 ">
              Subscribe now and receive weekly newsletter
            </small>
          </div>
          <div className=" flex-1 flex items-center ">
            <input
              className="p-4 pr-0 rounded-l-full w-full bg-[#F04646] outline-none text-gray-100 placeholder:text-sm placeholder:text-gray-200 placeholder:opacity-50 "
              type="text"
              placeholder="Email Adress"
            />

            <div className=" h-[56px] w-[56px] bg-[#F04646] rounded-r-full flex items-center justify-center text-white">
              <IoMailOpenSharp size={16} />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[407px] w-full bg-gray-800 flex items-center justify-center text-white text-[13px] ">
        <div className="w-main flex ">
          <div className="flex-2 flex-col flex gap-2">
            <h3 className=" mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px] "> ABOUT US </h3>
            <span>
              <span>Adress:</span>
              <span className="opacity-70"> 269 Nguyễn Thái Bình, Phường 4, Tân Bình</span>
            </span>
            <span>
              <span>Phone:</span>
              <span className="opacity-70"> 0934438974</span>
            </span>
            <span>
              <span>Mail:</span>
              <span className="opacity-70"> luuduong170502@gmail.com</span>
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <h3 className=" mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px] ">INFORMATION</h3>
            <span>Typography</span>
            <span>Gallery</span>
            <span>Store Location</span>
            <span>Today's Deals</span>
            <span>Contaxt</span>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <h3 className=" mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px] ">WHO WE ARE </h3>
            <span>Help</span>
            <span>Free Shipping</span>
            <span>FAQs</span>
            <span>Return & Exchange</span>
            <span>Testimonials</span>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <h3 className=" mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px] ">STORE</h3>
          
          </div>

        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
