const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const data = require("../../data/ecommerce.json");
const slugify = require("slugify");
const categoryData = require("../../data/cate_brand");
const ProductCategory = require("../models/productCategory");

const fn = async (product) => {
  await Product.create({
    title: product?.name,
    slug: slugify(product?.name) + Math.round(Math.random() * 100) + "",
    description: product?.description,
    brand: product?.brand,
    price: Math.round(Number(product?.price?.match(/\d/g).join(""))),
    category: product?.category[1],
    quantity: Math.round(Math.random() * 1000),
    sold: Math.round(Math.random() * 100),
    images: product?.images,
    color: "None",
    totalRatings: Math.round(Math.random() * 5),
  });
};

const insertProduct = asyncHandler(async (req, res) => {
  const promises = [];
  for (let product of data) promises.push(fn(product));
  await Promise.all(promises);
  // const response = await Product.create(req.body);
  return res.status(200).json("Done");
});

const fnn = async (cate) => {
  await ProductCategory.create({
    title: cate?.cate,
    brand: cate?.brand,
    image: cate?.image,
  });
};
const insertCategory = asyncHandler(async (req, res) => {
  const promises = [];
  for (let cate of categoryData) promises.push(fnn(cate));
  await Promise.all(promises);
  return res.status(200).json("Done");
});
module.exports = {
  insertProduct,
  insertCategory,
};
