const Brand = require("../models/brand");
const asyncHandler = require("express-async-handler");

const createNewBrand = asyncHandler(async (req, res) => {
  const response = await Brand.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    createdBrand: response
      ? response
      : "Cannot create new blog category ",
  });
});
const getBrand = asyncHandler(async (req, res) => {
  const response = await Brand.find();
  return res.status(200).json({
    success: response ? true : false,
    brands: response ? response : "Cannot get brand category ",
  });
});
const updateBrand = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const response = await Brand.findByIdAndUpdate(bid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    updatedBrands: response ? response : "Cannot update brand category ",
  });
});
const deleteCBrand = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const response = await Brand.findByIdAndDelete(bid);
  return res.status(200).json({
    success: response ? true : false,
    deletedCBrands: response ? response : "Cannot delete brand category ",
  });
});
module.exports = {
    createNewBrand,
  getBrand,
  updateBrand,
  deleteCBrand,
};
