const BlogCategory = require("../models/blogCategory");
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) => {
  const response = await BlogCategory.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    createdCategory: response
      ? response
      : "Cannot create new blog category ",
  });
});
const getCategory = asyncHandler(async (req, res) => {
  const response = await BlogCategory.find().select("title _id");
  return res.status(200).json({
    success: response ? true : false,
    productCategories: response ? response : "Cannot get blog category ",
  });
});
const updateCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const response = await BlogCategory.findByIdAndUpdate(bcid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    updatedCategories: response ? response : "Cannot update blog category ",
  });
});
const deleteCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const response = await BlogCategory.findByIdAndDelete(bcid);
  return res.status(200).json({
    success: response ? true : false,
    deletedCategories: response ? response : "Cannot delete blog category ",
  });
});
module.exports = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
