import React, { Fragment, useEffect, useState , memo} from "react";
import logo from "../assets/gogo.png";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import path from "../ultils/path";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "store/user/userSlice";
import { showCart } from "store/app/appSlice";
import withBaseComponent from "hocs/withBaseComponent";

const Header = () => {
  const { FaPhoneAlt, IoMailOpenSharp, IoBagHandleSharp, FaUserCircle } = icons;
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.user);
  const [isShowOption, setIsShowOption] = useState(false);
  useEffect(() => {
    const handleClickoutOptions = (e) => {
      const profile = document.getElementById("profile");
      if (!profile?.contains(e.target)) setIsShowOption(false);
    };

    document.addEventListener("click", handleClickoutOptions);

    return () => {
      document.removeEventListener("click", handleClickoutOptions);
    };
  }, []);
  return (
    <div className=" w-main flex justify-between h-[110px] py=[35px]">
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt="logo" className="w-[234px] object-contain" />
      </Link>
      <div className="flex text-[13px]">
        <div className="flex justify-center flex-col px-6 border-r items-center">
          <span className="flex gap-4 items-center">
            <FaPhoneAlt color="black" />
            <span className="font-semibold"> 0934438974</span>
          </span>

          <span>Thứ 2 - Thứ 7 | 9:00 - 20:00</span>
        </div>
        <div className="flex justify-center flex-col px-6 border-r items-center">
          <span className="flex gap-4 items-center">
            <IoMailOpenSharp color="black" />
            <span className="font-semibold"> Luuduong170502@gmail.com</span>
          </span>

          <span>Hỗ trợ 24/24</span>
        </div>
        {/* <div className="flex cursor-pointer items-center px-6 border-r justify-center gap-2">
          <IoBagHandleSharp />
          <span>0 item(s)</span>
        </div> */}
        {current && (
          <Fragment>
            <div
              onClick={() => dispatch(showCart())}
              className="cursor-pointer flex items-center justify-center gap-2 px-6 border-r"
            >
              <span className="relative md:hidden inline-block">
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 flex items-center justify-center text-[10px] text-white rounded-full">
                  {current?.cart?.length || 0}
                </span>
                <IoBagHandleSharp size={20} color="red" />
              </span>
              <span className="hidden md:inline-block">{`${
                current?.cart?.length || 0
              } item(s)`}</span>
            </div>
            <div
              className="flex cursor-pointer items-center justify-center px-6 gap-2 relative"
              onClick={() => setIsShowOption((prev) => !prev)}
              id="profile"
            >
              <FaUserCircle size={20} color="red" />
              <span className="hidden md:inline-block">Profile</span>
              {isShowOption && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-full flex-col flex right-4 md:left-[16px] bg-gray-100 border md:min-w-[150px] py-2"
                >
                  <Link
                    className="p-2 w-full hover:bg-sky-100"
                    to={`/${path.MEMBER}/${path.PERSONAL}`}
                  >
                    Personal
                  </Link>
                  {+current.role === 2002 && (
                    <Link
                      className="p-2 w-full hover:bg-sky-100"
                      to={`/${path.ADMIN}/${path.DASHBOARD}`}
                    >
                      Admin workspace
                    </Link>
                  )}
                  <span
                    onClick={() => dispatch(logout())}
                    className="p-2 w-full hover:bg-sky-100"
                  >
                    Logout
                  </span>
                </div>
              )}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default withBaseComponent(memo(Header));
