const router = require("express").Router();
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const ctrls = require("../controllers/blog");
const uploader = require("../config/cloudinary.config");

router.get("/", ctrls.getNewBlog);
router.get("/one/:bid", ctrls.getBlogs);
router.post("/", [verifyAccessToken, isAdmin], ctrls.createNewBlog);
router.put("/like/:bid", [verifyAccessToken], ctrls.likeBlog);
router.put(
  "/image/:bid",
  [verifyAccessToken, isAdmin],
  uploader.single("image"),
  ctrls.uploadImageBlog
);

router.put("/dislike/:bid", [verifyAccessToken], ctrls.disLikeBlog);
router.put("/:bid", [verifyAccessToken, isAdmin], ctrls.updateNewBlog);
router.delete("/:bid", [verifyAccessToken, isAdmin], ctrls.deleteBlogs);

module.exports = router;
