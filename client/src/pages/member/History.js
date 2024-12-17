import React, { useState, useEffect } from "react";
import {
  createSearchParams,
  useSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { apiGetUserOrders } from "apis";
import { InputForm } from "components";
import { useForm } from "react-hook-form";
import moment from "moment";
import { CustomSelect } from "components";
import { statusOrders } from "ultils/constant";

const History = ({}) => {
  const [orders, setOrders] = useState(null);
  const [counts, setCounts] = useState(0);
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const q = watch("q");
  const status = watch("status");
  const fetchPOrders = async (params) => {
    const response = await apiGetUserOrders({
      ...params,
      limit: process.env.REACT_APP_LIMIT,
    });
    if (response.success) {
      setOrders(response.orders);
      setCounts(response.counts);
    }
  };
  useEffect(() => {
    const pr = Object.fromEntries([...params]);
    fetchPOrders(pr);
  }, [params]);
  const handleSearchStatus = ({ value }) => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({ status: value }).toString(),
    });
  };
  console.log(orders);
  return (
    <div className="w-full relative px-4">
      <header className="text-3xl font-semibold py-4 border-b border-b-blue-200">
        History
      </header>
      <div className="flex justify-end items-center px-4">
        <form className="w-[45%] grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <InputForm
              id="q"
              register={register}
              errors={errors}
              fullWidth
              placeholder="Search orders by status,..."
            />
          </div>
          <div className="col-span-1 flex items-center">
            <CustomSelect
              options={statusOrders}
              value={status}
              onChange={(val) => handleSearchStatus(val)}
              wrapClassname="w-full"
            />
          </div>
        </form>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr className="border bg-sky-900 text-white border-white">
            <th className="text-center py-2">#</th>
            <th className="text-center py-2">Products</th>
            <th className="text-center py-2">Total</th>
            <th className="text-center py-2">Status</th>
            <th className="text-center py-2">Created At</th>
          </tr>
        </thead>
        {/* <tbody>
          {orders?.map((el, idx) => (
            <tr className="border-b" key={el._id}>
              <td className="text-center py-2">
                {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                  process.env.REACT_APP_LIMIT +
                  idx +
                  1}
              </td>
              <td className="text-center max-w-[500px] py-2">
                <span className="grid grid-cols-4 gap-4">
                  {el.products?.map((item) => (
                    <span
                      className="flex col-span-1 items-center gap-2"
                      key={item._id}
                    >
                      <img
                        src={item.images?.[0]}
                        alt="images"
                        className="w-8 h-8 rounded-md object-cover"
                      />
                      <span className="flex flex-col">
                        <span className="text-main text-sm">
                          {item.title}
                        </span>
                        <span className="flex items-center text-xs gap-2">
                          <span>Quantity:</span>
                          <span className="text-main">{item.quantity}</span>
                        </span>
                      </span>
                    </span>
                  ))}
                </span>
              </td>
              <td className="text-center py-2">{el.total + " 💲"}</td>
              <td className="text-center py-2">{el.status}</td>
              <td className="text-center py-2">
                {moment(el.createdAt)?.format("DD/MM/YYYY")}
              </td>
            </tr>
          ))}
        </tbody> */}
        <tbody>
          {orders?.map((el, idx) => (
            <tr className="border-b" key={el._id}>
              <td className="text-center py-2">
                {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                  process.env.REACT_APP_LIMIT +
                  idx +
                  1}
              </td>
              <td className="text-center max-w-[500px] py-2">
                <span className="grid grid-cols-4 gap-4">
                  {el.products?.map((item) => {
                    // Log item ra console
                    console.log("Item details:", item);

                    return (
                      <span
                        className="flex col-span-1 items-center gap-2"
                        key={item._id}
                      >
                        <img
                          src={
                            item.thumbnail ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_GOhUXbTBGraHVj2z0UFnXvCcTRBsY_hXBg&s"
                          }
                          alt="images"
                          className="w-8 h-8 rounded-md object-cover"
                        />
                        <span className="flex flex-col">
                          <span className="text-main text-sm">
                            {item.title}
                          </span>
                          <span className="flex items-center text-xs gap-2">
                            <span>Quantity:</span>
                            <span className="text-main">{item.quantity}</span>
                          </span>
                        </span>
                      </span>
                    );
                  })}
                </span>
              </td>
              <td className="text-center py-2">{el.total + " 💲"}</td>
              <td className="text-center py-2">{el.status}</td>
              <td className="text-center py-2">
                {moment(el.createdAt)?.format("DD/MM/YYYY")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
