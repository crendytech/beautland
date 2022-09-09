import { useSpring } from "react-spring";

export const useAnimateImageWithBorder = () => {
  const [animateImageWithBorder, animateImageWithBorderApi] = useSpring(() => ({
    transform: "scale(1.7)",
    config: {
      tension: 280,
      friction: 40,
    },
  }));
  return [animateImageWithBorder, animateImageWithBorderApi];
};

export const useAnimateImageBorder = (s) => {
  return useSpring(() => ({
    transform: `translateY(-60%) scale(${s?.initialScale || 0})`,
    top: "60%",
    config: {
      tension: 280,
      friction: 50,
    },
  }));
};