import React, { useState, useEffect } from "react";
import {
  Sidebar,
  Banner,
  BestSeller,
  DealDaily,
  FeatureProduct,
  Customslider,
} from "../../components";
import { useSelector } from "react-redux";
import icons from "../../ultils/icons";
import { createSearchParams, useNavigate } from "react-router-dom";
import { apiGetCategories } from "apis";
import { withBaseComponent } from "../../components";

const { IoIosArrowForward } = icons;
// const settings = {
//   dots: false,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 3,
//   slidesToScroll: 1,
// };
const Home = ({}) => {
  const navigate = useNavigate();
  const { newProducts } = useSelector((state) => state.products);
  // const { categories } = useSelector((state) => state.app);
  // console.log(categories);
  const [categories, setCategories] = useState(null);
  const fetchCategories = async () => {
    const response = await apiGetCategories();
    if (response?.success) setCategories(response?.productCategories);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      <div className="w-main flex">
        <div className="flex flex-col gap-5 w-[25%] flex-auto">
          <Sidebar />
          <DealDaily />
        </div>
        <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto ">
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className="my-8">
        <FeatureProduct />
      </div>
      <div className="my-8 w-full">
        <h3 className="text-[20px] font-semibold py-[15px]">NEW ARRIVALS</h3>
        <div className="w-full mt-4 mx-[-10px] border-t-2 border-main pt-4  ">
          <Customslider products={newProducts} />
        </div>
      </div>
      <div className="my-8 w-full">
        <h3 className="text-[20px] font-semibold py-[15px]">HOT COLLECTIONS</h3>
        <div className="w-screen flex flex-wrap gap-6 pr-4">
          {categories
            ?.filter((el) => el.brand.length > 0)
            ?.map((el) => (
              <div
                key={el._id}
                className="flex-none w-[calc(33.33%-16px)] max-w-[calc(33.33%-16px)]"
              >
                <div className="border w-full flex p-4 gap-4 min-h-[190px]">
                  <img
                    src={el?.image}
                    alt=""
                    className="w-1/2 flex-1 h-[129px] object-cover"
                  />

                  <div className="w-1/2 flex-1 text-gray-700">
                    <h4 className="font-semibold uppercase">{el.title}</h4>
                    <ul className="text-sm">
                      {el?.brand?.map((item) => (
                        <span
                          key={item}
                          className="flex cursor-pointer hover:underline gap-1 items-center text-gray-500"
                          onClick={() =>
                            navigate({
                              pathname: `/${el.title.toLowerCase()}`,
                              search: createSearchParams({
                                brand: item,
                              }).toString(),
                            })
                          }
                        >
                          <IoIosArrowForward size={14} />
                          <li>{item}</li>
                        </span>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="w-full h-[500px]:"></div>
    </>
  );
};

export default withBaseComponent(Home);
