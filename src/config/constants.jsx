// constants.js
import {Dimensions} from 'react-native';
import store from '../redux/store'; // Import the Redux store
const {width, height} = Dimensions.get('window');

// Define colors for light and dark themes
const lightColors = {
  primaryBackground: '#FFFFFF',
  secondaryBackground: '#F5F5F5',
  inputBackground: '#EEEEEE',
  primaryText: '#000000',
  secondaryText: '#000000',
  placeholderText: '#999999',
  primary: '#4A90E2',
  iconActive: '#4A90E2',
  iconInactive: '#666666',
  headerBackground: '#FFFFFF',
  messageBubbleUser: '#4A90E2',
  messageBubbleAI: '#F0F0F0',
  border: '#E0E0E0',
  codeBlockBackground: '#F5F5F5',
  loadingText: '#666666',
};

const darkColors = {
  primaryBackground: '#1A1A1A',
  secondaryBackground: '#2A2A2A',
  inputBackground: '#3A3A3A',
  primaryText: '#FFFFFF',
  secondaryText: '#CCCCCC',
  placeholderText: '#999999',
  primary: '#4A90E2',
  iconActive: '#4A90E2',
  iconInactive: '#666666',
  headerBackground: '#2A2A2A',
  messageBubbleUser: '#4A90E2',
  messageBubbleAI: '#2A2A2A',
  codeBlockBackground: '#1E1E1E',
  loadingText: '#FFFFFF',
};

const fontSizes = {
  small: width * 0.04,
  medium: width * 0.045,
  large: width * 0.055,
  xlarge: width * 0.065,
};

const fontFamilies = {
  regular: 'Poppins-Regular', // Regular variant
  light: 'Poppins-Light', // Light variant
  medium: 'Poppins-Medium', // Medium variant
  bold: 'Poppins-Bold', // Bold variant
  extraBold: 'Poppins-ExtraBold', // ExtraBold variant
  black: 'Poppins-Black', // Black variant
  boldItalic: 'Poppins-BoldItalic', // Bold Italic variant
  monospace: 'Poppins-Bold', // Monospace variant (using Poppins-Bold)
};

const screen = {width, height};

// Export a function that returns the current theme colors
export const getThemeColors = (theme = 'dark') => {
  return theme === 'dark' ? darkColors : lightColors;
};

// Export other constants
export const constants = {
  fontSizes,
  fontFamilies,
  screen,
};
