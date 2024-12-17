import { apiGetCategories } from "../apis/app";
import { NavLink } from "react-router-dom";
import { createSlug } from "../ultils/helper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [categories, setCategories] = useState(null);
  const fetchCategories = async () => {
    const response = await apiGetCategories();
    if (response?.success) setCategories(response?.productCategories);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  // const { categories } = useSelector((state) => state.app);
  return (
    <div className="flex flex-col border">
      {categories?.map((el) => (
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-main text-white font-bold uppercase px-5 pt-[15px] pb-[14px] text-sm hover:text-main"
              : "px-5 pt-[15px] pb-[14px] uppercase text-sm hover:text-main"
          }
          key={createSlug(el.title)}
          to={createSlug(el.title)}
        >
          {el.title}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
