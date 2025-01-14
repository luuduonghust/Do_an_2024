import React, { memo } from "react";
import { CgSpinner } from "react-icons/cg";

const Button = ({
  children,
  handleOnClick,
  style,
  wf,
  type = "button",
  disabled,
}) => {
  return (
    <div>
      <button
        type={type}
        className={`${
          style
            ? style
            : `px-4 py-2 rounded-md text-white bg-main font-semibold my-2 outline-none`
        } ${wf ? "w-full" : "w-fit"}`}
        onClick={() => {
          handleOnClick && handleOnClick();
        }}
      >
        {disabled && (
          <span className="animate-spin">
            <CgSpinner size={18} />
          </span>
        )}
        {children}
      </button>
    </div>
  );
};

export default memo(Button);
