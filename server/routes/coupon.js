const router = require("express").Router();
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const ctrls = require("../controllers/coupon");

router.get("/", ctrls.getCuppon);
// router.get("/one/:bid", ctrls.getBlogs);
router.post("/", [verifyAccessToken, isAdmin], ctrls.createNewCoupon);
// router.put("/like/:bid", [verifyAccessToken], ctrls.likeBlog);
// router.put("/dislike/:bid", [verifyAccessToken], ctrls.disLikeBlog);
router.put("/:cid", [verifyAccessToken, isAdmin], ctrls.updateCoupon);
router.delete("/:cid", [verifyAccessToken, isAdmin], ctrls.deleteCoupon);

module.exports = router;
