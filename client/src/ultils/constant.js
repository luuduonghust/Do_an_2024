import path from "./path";
import icons from "./icons";
const { RiTruckFill, BsShieldShaded, BsReplyFill, FaTty, AiFillGift } = icons;

export const navigation = [
  {
    id: 1,
    value: "HOME",
    path: `/${path.HOME}`,
  },
  {
    id: 2,
    value: "PRODUCTS",
    path: `/${path.PRODUCTS}`,
  },
  {
    id: 3,
    value: "BLOGS",
    path: `/${path.BLOGS}`,
  },
  {
    id: 4,
    value: "OUR SERVICE",
    path: `/${path.OUR_SERVICE}`,
  },
  {
    id: 5,
    value: "FAQs",
    path: `/${path.FAQ}`,
  },
];
export const productExtraInfomation = [
  {
    id: "1",
    title: "Guarantee",
    sub: "Quality Checked",
    icon: <BsShieldShaded />,
  },
  {
    id: "2",
    title: "Free Shipping",
    sub: "Free On All Products",
    icon: <RiTruckFill />,
  },
  {
    id: "3",
    title: "Special Gift Cards",
    sub: "Special Gift Cards",
    icon: <AiFillGift />,
  },
  {
    id: "4",
    title: "Free Return",
    sub: "Within 7 Days",
    icon: <BsReplyFill />,
  },
  {
    id: "5",
    title: "Consultancy",
    sub: "Lifetime 24/7/356",
    icon: <FaTty />,
  },
];
export const productInfoTabs = [
  {
    id: 1,
    name: "DISCRIPTION",
    content: `Chống thấm nước tuyệt đối, phù hợp với nhà tắm và nhà bếp.
            Độ bền cao, chịu lực tốt, không bị rạn nứt theo thời gian.
            Bề mặt chống trầy xước, giữ được độ bóng đẹp lâu dài.
          Thông số kỹ thuật:
          Kích thước: 60x60 cm.
          Độ dày: 8 mm.
          Màu sắc: Trắng vân mây hiện đại.
          Ứng dụng:
          Phù hợp sử dụng cho phòng khách, nhà bếp, văn phòng hoặc không gian ngoại thất.
          Cam kết:
          Sản phẩm đạt tiêu chuẩn ISO 9001, bảo hành 2 năm.`,
  },
  {
    id: 2,
    name: "WARRANTY",
    content: `WARRANTY INFORMATION
         Thời gian bảo hành được tính từ ngày giao hàng hoặc ngày ký biên bản bàn giao sản phẩm, cụ thể như sau:
Gạch, đá ốp lát: Bảo hành 12 tháng.
Sơn và vật liệu phủ bề mặt: Bảo hành 24 tháng (theo tiêu chuẩn nhà sản xuất).
Xi măng, sắt thép, và các vật liệu nền tảng khác: Không bảo hành, chỉ hỗ trợ đổi trả nếu phát hiện lỗi sản xuất trước khi sử dụng.
`,
  },
  {
    id: 3,
    name: "DELIVERY",
    content: `Quy trình Mua hàng
Tư vấn và báo giá:

Khách hàng liên hệ trực tiếp qua hotline hoặc email.
Đội ngũ kinh doanh sẽ tư vấn và cung cấp báo giá chi tiết dựa trên yêu cầu và số lượng cụ thể.
Xác nhận đơn hàng:

Khách hàng kiểm tra thông tin đơn hàng và xác nhận đặt hàng.
Tiến hành thanh toán theo thỏa thuận (chuyển khoản hoặc tiền mặt).
Chuẩn bị hàng hóa:

Sản phẩm được kiểm tra chất lượng và đóng gói cẩn thận trước khi vận chuyển.
Thời gian chuẩn bị sẽ phụ thuộc vào loại và số lượng vật liệu đặt mua.
Chính sách Vận chuyển
Khu vực giao hàng:

Hỗ trợ vận chuyển toàn quốc.
Đối với khu vực nội thành, thời gian giao hàng từ 1–2 ngày làm việc.
Khu vực ngoại tỉnh, thời gian từ 3–5 ngày tùy thuộc vào khoảng cách.
Phương thức giao hàng:

Vận chuyển bằng xe tải hoặc container, tùy theo khối lượng đơn hàng.
Đối với các đơn hàng lớn, có thể hỗ trợ vận chuyển trực tiếp đến công trường.
Chi phí vận chuyển:

Miễn phí vận chuyển với đơn hàng trên 50 triệu đồng.
Đối với đơn hàng nhỏ, phí vận chuyển được tính theo bảng giá hiện hành hoặc thỏa thuận trực tiếp.
Kiểm tra và nhận hàng:

Khách hàng kiểm tra số lượng và chất lượng hàng hóa trước khi ký nhận.
Nếu phát hiện hàng hóa bị hư hỏng hoặc thiếu số lượng, khách hàng cần thông báo ngay trong vòng 24 giờ.`,
  },
  {
    id: 4,
    name: "PAYMENT",
    content: `Kiểm tra và xác nhận đơn hàng:

Đảm bảo danh mục, số lượng, đơn giá vật liệu đúng với hợp đồng hoặc báo giá.
Xác minh hóa đơn:

Đối chiếu thông tin trên hóa đơn (tên công ty, mã số thuế, giá trị, ngày tháng).
Yêu cầu hóa đơn đỏ nếu cần khấu trừ thuế.
Lựa chọn phương thức thanh toán:

Tùy vào thỏa thuận với nhà cung cấp hoặc quy định của doanh nghiệp.
Thanh toán và lưu chứng từ:

Lưu giữ biên lai, hóa đơn và xác nhận thanh toán để làm căn cứ pháp lý khi cần.`,
  },
];

export const colors = [
  "black",
  "brown",
  "gray",
  "white",
  "pink",
  "yellow",
  "orange",
  "purple",
  "green",
  "blue",
];

export const sorts = [
  {
    id: 1,
    value: "-sold",
    text: "Best selling",
  },
  {
    id: 2,
    value: "-title",
    text: "Alphabetically, A-Z",
  },
  {
    id: 3,
    value: "title",
    text: "Alphabetically, Z-A",
  },
  {
    id: 4,
    value: "-price",
    text: "Price, high to low",
  },
  {
    id: 5,
    value: "price",
    text: "Price, low to high",
  },
  {
    id: 6,
    value: "-createdAt",
    text: "Date, new to old",
  },
  {
    id: 7,
    value: "createdAt",
    text: "Date, old to new",
  },
];
export const voteOptions = [
  {
    id: 1,
    text: "Terrible",
  },
  {
    id: 2,
    text: "Bad",
  },
  {
    id: 3,
    text: "Neutral",
  },

  {
    id: 4,
    text: "Good",
  },

  {
    id: 5,
    text: "Perfect",
  },
];
const { AiOutlineDashboard, MdGroups, TbBrandProducthunt, RiBillLine } = icons;
export const adminSidebar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Dashboard",
    path: `/${path.ADMIN}/${path.DASHBOARD}`,
    icon: <AiOutlineDashboard size={20} />,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "Manage users",
    path: `/${path.ADMIN}/${path.MANAGE_USER}`,
    icon: <MdGroups size={20} />,
  },
  {
    id: 3,
    type: "PARENT",
    text: "Products",
    icon: <TbBrandProducthunt size={20} />,
    submenu: [
      {
        text: "Create product",
        path: `/${path.ADMIN}/${path.CREATE_PRODUCTS}`,
      },
      {
        text: "Manage products",
        path: `/${path.ADMIN}/${path.MANAGE_PRODUCTS}`,
      },
    ],
  },
  {
    id: 4,
    type: "SINGLE",
    text: "Manage orders",
    path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
    icon: <RiBillLine size={20} />,
  },
  {
    id: 31,
    type: "PARENT",
    text: "Blogs",
    icon: <TbBrandProducthunt size={20} />,
    submenu: [
      {
        text: "Create blog",
        path: `/${path.ADMIN}/${path.CREATE_BLOG}`,
      },
      {
        text: "Manage blogs",
        path: `/${path.ADMIN}/${path.MANAGE_BLOGS}`,
      },
    ],
  },
];
export const roles = [
  {
    code: 2002,
    value: "Admin",
  },
  {
    code: 2009,
    value: "User",
  },
];
export const blockStatus = [
  {
    code: true,
    value: "Blocked",
  },
  {
    code: false,
    value: "Active",
  },
];
export const memberSidebar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Personal",
    path: `/${path.MEMBER}/${path.PERSONAL}`,
    icon: <AiOutlineDashboard size={20} />,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "My cart",
    path: `/${path.MEMBER}/${path.MY_CART}`,
    icon: <MdGroups size={20} />,
  },
  {
    id: 4,
    type: "SINGLE",
    text: "Buy histories",
    path: `/${path.MEMBER}/${path.HISTORY}`,
    icon: <RiBillLine size={20} />,
  },
  {
    id: 40,
    type: "SINGLE",
    text: "Wishlist",
    path: `/${path.MEMBER}/${path.WISHLIST}`,
    icon: <RiBillLine size={20} />,
  },
];
export const statusOrders = [
  {
    label: "Cancalled",
    value: "Cancalled",
  },
  {
    label: "Succeed",
    value: "Succeed",
  },
];
