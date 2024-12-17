import icons from "./icons";
const { FaRegStar, MdOutlineStar } = icons;
export const createSlug = (string) =>
  string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");
export const formatMoney = (number) =>
  Number((number ?? 0).toFixed(1)).toLocaleString();

export const renderStarFromNumber = (number) => {
  if (!Number(number)) return null;
  //4 = [1,1,1,1,0]
  //2 = [1,1,0,0,0]
  const stars = [];
  for (let i = 0; i < +number; i++)
    stars.push(<MdOutlineStar color="orange" className="border-orange-400" />);
  for (let i = 5; i > +number; i--) stars.push(<FaRegStar color="orange" />);
  return stars;
};

export const validate = (payload, setInvalidFields) => {
  let invalids = 0;
  const formatPayload = Object.entries(payload);
  for (let arr of formatPayload) {
    if (arr[1].trim() === "") {
      invalids++;
      setInvalidFields((prev) => [
        ...prev,
        { name: arr[0], mes: "Require this field" },
      ]);
    }
  }
  return invalids;
};
export const fotmatPrice = (number) => Math.round(number / 1000) * 1000;
export const generateRange = (start, end) => {
  const length = end + 1 - start;
  return Array.from({ length }, (_, index) => start + index);
};
export function getBase64(file) {
  if (!file) return "";
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
