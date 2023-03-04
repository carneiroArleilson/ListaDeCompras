import {RFValue} from 'react-native-responsive-fontsize';

/**
 * Returns the value proportional to the screen
 * @param value number
 * @returns number
 */
const getResponsiveValue = (value: number): number => {
  return RFValue(value);
};

export {getResponsiveValue};
