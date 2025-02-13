import icons from "./icons";
const { FaStar, FaRegStar } = icons;


export const createSlug = (string) =>
  string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");

export const formatMoney = (number) =>
  Number(number?.toFixed(1)).toLocaleString();

export const renderStarFromNumber = (number, size) => {
  if (!Number(number)) return;
  const stars = [];
  number = Math.round(number)
  for (let i = 0; i < +number; i++) {
    stars.push(<FaStar color="orange" size={size || 16} />);
  }
  for (let i = 5; i > +number; i--) {
    stars.push(<FaRegStar color="orange" size={size || 16} />);
  }
  return stars;
};
export function secondsToHms(d) {
  d = Number(d) / 1000; //ban đầu d là số mili giấy đổi ra giây phải chia cho 1000
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);
  return { h, m, s };
}
export const validate = (payload, setInvalidFieds) => {
  let invalids = 0;
  const formatPayload = Object.entries(payload);
  // console.log(formatPayload);
  for (let arr of formatPayload) {
    if (arr[1].trim() === "") {
      invalids++;
      setInvalidFieds((prev) => [
        ...prev,
        { name: arr[0], mes: "Trường này yêu cầu bắt buộc!." },
      ]);
    }
  }
}