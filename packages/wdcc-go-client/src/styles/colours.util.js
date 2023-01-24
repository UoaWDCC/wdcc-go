import ContrastColor from "contrast-color";

const getContrastColour = (bgColour) => {
  const cc = new ContrastColor({
    bgColor: "navy",
    fgDarkColor: "#183249",
    fgLightColor: "#EFF8FA",
  });

  const res = cc.contrastColor({
    bgColor: bgColour,
  });

  return res;
};

export { getContrastColour };
