import { useWindowDimensions } from 'react-native';

export const useViewportUnits = () => {
  const { width, height } = useWindowDimensions();

  const vh = height / 100;
  const vw = width / 100;

  return { vh, vw };
};
