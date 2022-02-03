import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export const uuid4 = (length: number = 8) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getKeyByValue = (
  object: { [key: string]: string },
  value: string,
) => {
  return Object.keys(object).find((key) => object[key] === value) || value;
};

export const sort = (array: any, key: string, reversed?: boolean) => {
  const result = array
    .slice()
    .sort((a: { [key: string]: any }, b: { [key: string]: any }) => {
      if (!a?.[key] && !b?.[key]) {
        return reversed ? 1 : -1;
      }
      if (a?.[key] > b?.[key]) {
        return reversed ? -1 : 1;
      }
      if (a?.[key] < b?.[key]) {
        return reversed ? 1 : -1;
      }
      return 0;
    });
  return result;
};

export const styleee = (
  checker: boolean = false,
  styles: StyleProp<ViewStyle | TextStyle>,
  elseStyles?: StyleProp<ViewStyle | TextStyle>,
) => {
  if (checker) {
    return styles;
  }

  if (!checker && !!elseStyles) {
    return elseStyles;
  }
  return null;
};

export const getOrDefault = (value: string, def: string) => {
  if (value === '') {
    return def;
  }
  return value;
};

export const getRandomColor = () => {
  const color = 'hsl(' + Math.random() * 360 + ', 70%, 70%)';
  return color;
};

export const getTextLetters = (s: string) => {
  return s
    .toUpperCase()
    .split(' ')
    .map((w) => w[0])
    .join('');
};

export const decline = (value: number, words: string[]) => {
  const newValue = Math.abs(value) % 100;
  const num = newValue % 10;
  if (newValue > 10 && newValue < 20) return `${value} ${words[2]}`;
  if (num > 1 && num < 5) return `${value} ${words[1]}`;
  if (num == 1) return `${value} ${words[0]}`;
  return `${value} ${words[2]}`;
};
