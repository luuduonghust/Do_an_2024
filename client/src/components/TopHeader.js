import React, { memo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import path from "../ultils/path";
import { getCurrent } from "../store/user/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import icons from "../ultils/icons";
import Swal from "sweetalert2";
import { logout, clearMessage } from "../store/user/userSlice";
const { AiOutlineLogout } = icons;

const TopHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, current, mes } = useSelector((state) => state.user);
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn) dispatch(getCurrent());
    }, 300);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (mes)
      Swal.fire("Oops!", mes, "info").then(() => {
        dispatch(clearMessage());
        navigate(`/${path.LOGIN}`);
      });
  }, [mes]);

  return (
    <div className="h-[38px] w-full bg-blue-400 flex items-center justify-center">
      <div className="w-main flex items-center justify-between text-xs text-white">
        <span>ORDER ONLINE (+84)934438974</span>
        {/* <Link className='hover:text-black' to={`${path.LOGIN}`}>  Sign In or Create Account  </Link> */}
        {isLoggedIn && current ? (
          <div className=" flex gap-4 w-full md:w-fit text-sm justify-between md:justify-start items-center">
            <span className="pl-2">{`Welcome, ${current?.lastname} ${current?.firstname}`}</span>
            <span
              onClick={() => dispatch(logout())}
              className="hover:rounded-full hover:bg-gray-200 cursor-pointer hover:text-main p-2"
            >
              <AiOutlineLogout size={18} />
            </span>
          </div>
        ) : (
          <Link className="hover:text-gray-800" to={`/${path.LOGIN}`}>
            Sign In or Create Account
          </Link>
        )}
      </div>
    </div>
  );
};

export default memo(TopHeader);
