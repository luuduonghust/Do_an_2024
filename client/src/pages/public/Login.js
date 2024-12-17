import React, { useState, useCallback, useEffect } from "react";
import { InputField, Button, Loading } from "../../components";
import { apiRegister, apiLogin, apiForgotPassword } from "../../apis";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import path from "../../ultils/path";
import { register } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { validate } from "../../ultils/helper";
import { showModal } from "store/app/appSlice";
// import Loading from "../../components";
import { useSearchParams } from "react-router-dom";
export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const location = useLocation();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    mobile: "",
  });
  const [invalidFields, setInvalidFields] = useState([]);
  const [searchParams] = useSearchParams()
  const [isFogotPassword, setIsFogotPasswordl] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const resetPlayload = () => {
    setPayload({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      mobile: "",
    });
  };
  const [email, setEmail] = useState("");
  const handleForotPassword = async () => {
    const response = await apiForgotPassword({ email });
    if (response.success) {
      // setIsFogotPasswordl(false)
      toast.success(response.mes, { theme: "colored" });
    } else {
      toast.info(response.mes, { theme: "colored" });
    }
  };
  useEffect(() => {
    resetPlayload();
  }, [isRegister]);
  //Submit
  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payload;
    // const data =  isRegister ?payload : {email: payload.email, password: payload.password}
    const invalids = isRegister
      ? validate(payload, setInvalidFields)
      : validate(data, setInvalidFields);
    if (invalids === 0) {
      if (isRegister) {
        dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
        const response = await apiRegister(payload);
        dispatch(showModal({ isShowModal: false, modalChildren: null }));
        if (response.success) {
          Swal.fire("Congratulation", response.mes, "success").then(() => {
            setIsRegister(false);
            resetPlayload();
          });
        } else Swal.fire("Oops!", response.mes, "error")
      } else {
        const rs = await apiLogin(data);
        if (rs.success) {
          dispatch(
            register({
              isLoggedIn: true,
              token: rs.accessToken,
              userData: rs.userData,
            })
          );
          searchParams.get("redirect")
          ? navigate(searchParams.get("redirect"))
          : navigate(`/${path.HOME}`)
        } else Swal.fire("Congratulation", rs.mes, "error");
      }
    }
  }, [payload, isRegister]);

  // console.log(payload);
  return (
    <div className="w-screen h-screen relative">
      {isFogotPassword && (
        <div className="absolute top-0 left-0 bottom-0 right-0 z-50 bg-white flex flex-col items-center py-8 ">
          <div className="flex flex-col gap-4">
            <label htmlFor="email">Enter your email: </label>
            <input
              type="text"
              id="email"
              className="w-[800px] p-4 border-b outline-none placeholder:text-sm"
              placeholder="EXP: anhyeuem@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex items-center justify-end w-full gap-4">
              <Button
                name="Back"
                handleOnClick={() => setIsFogotPasswordl(false)}
              />
              <Button
                style="px-4 py-2 rounded-md text-white bg-blue-500 font-semibold my-2"
                name="Submit"
                handleOnClick={handleForotPassword}
              />
            </div>
          </div>
        </div>
      )}
      <img
        src="https://thanhnien.mediacdn.vn/Uploaded/hoangnam/2022_06_11/3a5-8997.jpg"
        className="w-full h-full object-cover"
        alt="Background"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="p-8 bg-white flex flex-col items-center rounded-md min-w-[500px] space-y-4">
          <h1 className="text-[28px] font-semibold text-main mb-8">
            {isRegister ? "Register" : "Login"}
          </h1>
          {isRegister && (
            <div className="flex items-center gap-2 w-full">
              <InputField
                value={payload.firstname}
                setValue={setPayload}
                nameKey="firstname"
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
              <InputField
                value={payload.lastname}
                setValue={setPayload}
                nameKey="lastname"
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
            </div>
          )}
          <InputField
            value={payload.email}
            setValue={setPayload}
            nameKey="email"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          {isRegister && (
            <InputField
              value={payload.mobile}
              setValue={setPayload}
              nameKey="mobile"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
          )}
          <InputField
            value={payload.password}
            setValue={setPayload}
            nameKey="password"
            type="password"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <Button handleOnClick={handleSubmit} className="mt-4" wf={true}>
            {isRegister ? "Register" : "Login"}
          </Button>
          <div className="flex items-center justify-between my-2 w-full text-sm">
            {!isRegister && (
              <span
                onClick={() => setIsFogotPasswordl(true)}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Fogot your account?
              </span>
            )}
            {!isRegister && (
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => setIsRegister(true)}
              >
                Create new account
              </span>
            )}
            {isRegister && (
              <span
                className="text-blue-500 hover:underline cursor-pointer w-full text-center"
                onClick={() => setIsRegister(false)}
              >
                Go Login
              </span>
            )}
          </div>
          <Link
            className="text-blue-500 text-sm hover:underline cursor-pointer w-full text-center"
            to={`/${path.HOME}`}
          >
            Go home?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
