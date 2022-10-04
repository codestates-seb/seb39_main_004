const deviceSizes = {
  mobile: "420px",
  tablet: "768px",
  desktop: "1280px",
};

const device = {
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`,
  desktop: `screen and (max-width: ${deviceSizes.desktop})`,
};

const theme = {
  device,
};

export default theme;
