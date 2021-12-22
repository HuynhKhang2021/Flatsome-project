const sizes = {
  mobile: "576",
  tablet: "768px",
  laptop: "992px",
  laptopL: "1200",
};
export const DEVICES = {
  mobileS: `(max-width: ${sizes.mobile})`,
  mobile: `(min-width: ${sizes.mobile})`,
  tablet: `(min-width: ${sizes.tablet})`,
  laptop: `(min-width: ${sizes.laptop})`,
  laptopL: `(min-width: ${sizes.laptopL})`,
};
