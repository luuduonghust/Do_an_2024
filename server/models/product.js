const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, //tự động bỏ dấu cách ở 2 đầu trong DB
    },
    slug: {
      //tên sản phẩm bằng gạch nối đồng hồ apple => dong-ho-apple
      type: String,
      required: true,
      // unique: true,
      lowercase: true, //viết thường lại
    },
    description: {
      //mô tả sản phẩm
      type: String,
      required: true,
    },
    brand: {
      //nhãn sản phẩm nhà sản xuất
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    color: {
      type: String,
      require: true,
      // enum: ['Black', 'Grown', 'Red'] //nằm trong giá trị cho trước
    },
    ratings: [
      {
        star: { type: Number },
        postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
        comment: { type: String },
        updatedAt: { type: Date },
      },
    ],
    totalRatings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, //type thời gian
  }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
