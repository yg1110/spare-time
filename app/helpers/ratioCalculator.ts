import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const textScale = (size: number) => {
  const ratio = width / guidelineBaseWidth;
  const newSize = size * ratio;
  if (Platform.OS === 'ios') {
    if (PixelRatio.get() >= 3) {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 0.25;
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    }
  } else {
    if (PixelRatio.get() >= 3) {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 0.5;
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 0.5;
    }
  }
};

export { scale, textScale };
