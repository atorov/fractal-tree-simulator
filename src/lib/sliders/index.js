import config from "../config/"

function getSlidersInitValue(key, data) {
  return data.find((item) => item.key === key).init;
}

export function getPlant() {
  return {
    recursionDepth: getSlidersInitValue("recursionDepth", config.sliders),
    size: getSlidersInitValue("size", config.sliders),
    branchMinLength: getSlidersInitValue("branchMinLength", config.sliders),
    decCoeffA: getSlidersInitValue("decCoeffA", config.sliders),
    decCoeffB: getSlidersInitValue("decCoeffB", config.sliders),
    thickness: getSlidersInitValue("thickness", config.sliders),
    alpha: getSlidersInitValue("alpha", config.sliders),
    deltaAlpha: getSlidersInitValue("deltaAlpha", config.sliders),
    deltaBeta: getSlidersInitValue("deltaBeta", config.sliders),
    gamma: getSlidersInitValue("gamma", config.sliders),
    randomization: getSlidersInitValue("randomization", config.sliders),
    hue: getSlidersInitValue("hue", config.sliders),
    saturation: getSlidersInitValue("saturation", config.sliders),
    brightness: getSlidersInitValue("brightness", config.sliders),
    branchesNum: null,
  };
};
