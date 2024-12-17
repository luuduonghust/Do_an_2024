const Blog = require("../models/blog");
const asyncHandler = require("express-async-handler");

const createNewBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category) throw new Error("Missing inputs");
  const response = await Blog.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    createdBlog: response ? response : "Cannot create new blog ",
  });
});
const updateNewBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
  return res.status(200).json({
    success: response ? true : false,
    updatedBlog: response ? response : "Cannot create new update blog ",
  });
});
const getNewBlog = asyncHandler(async (req, res) => {
  // if(Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  const response = await Blog.find();
  return res.status(200).json({
    success: response ? true : false,
    updatedBlog: response ? response : "Cannot get blog ",
  });
});

// khi nguoi dung like mot bai blog
//check xem nguoi dung do co dislike hay khong -> bo dislike
// neu ko co thi checkxem nguoi do truoc do co like hay khong -> bo like/ them like
const likeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("Missing inputs");
  const blog = await Blog.findById(bid);
  const alreadyDisliked = blog?.disLikes?.find((el) => el.toString() === _id);
  if (alreadyDisliked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { disLikes: _id } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      rs: response,
    });
  }
  const isLikes = blog?.likes?.find((el) => el.toString() === _id);
  if (isLikes) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { likes: _id } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      rs: response,
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { likes: _id } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      rs: response,
    });
  }
});
const disLikeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("Missing inputs");
  const blog = await Blog.findById(bid);
  const alreadyLiked = blog?.likes?.find((el) => el.toString() === _id);
  if (alreadyLiked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { likes: _id } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      rs: response,
    });
  }
  const isDisLikes = blog?.likes?.find((el) => el.toString() === _id);
  if (isDisLikes) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { disLikes: _id } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      rs: response,
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { disLikes: _id } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      rs: response,
    });
  }
});

const excludesFields = "-refreshToken - password -role -createAt - updateAt ";
const getBlogs = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const blog = await Blog.findByIdAndUpdate(
    bid,
    { $inc: { numberViews: 1 } },
    { new: true }
  )
    .populate("likes", excludesFields)
    .populate("disLikes", excludesFields);
  return res.json({
    success: blog ? true : false,
    rs: blog,
  });
});

const deleteBlogs = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const blog = await Blog.findByIdAndDelete(bid);

  return res.json({
    success: blog ? true : false,
    deleteBlog: blog,
  });
});
const uploadImageBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  console.log(req.files);
  if (!req.file) throw new Error("Missing unputs");
  const response = await Blog.findByIdAndUpdate(
    bid,
    { image: req.file.path },
    { new: true }
  );
  return res.status(200).json({
    status: response ? true : false,
    updatedBlog: response ? response : "cannot update image blog",
  });
});

module.exports = {
  createNewBlog,
  updateNewBlog,
  getNewBlog,
  likeBlog,
  disLikeBlog,
  getBlogs,
  deleteBlogs,
  uploadImageBlog,
};
