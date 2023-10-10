
const FormatPrice = ({ price }) => {

  const intlPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(price / 100);

  return intlPrice;
};

export default FormatPrice;
