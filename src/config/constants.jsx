import {Dimensions, Appearance} from 'react-native';

const {width, height} = Dimensions.get('window');

// Define colors for light and dark themes
const lightColors = {
  // Background colors
  primaryBackground: '#FFFFFF', // Main app background
  secondaryBackground: '#F5F5F5', // Secondary backgrounds
  inputBackground: '#EEEEEE', // Input field background

  // Text colors
  primaryText: '#000000', // Main text color
  secondaryText: '#666666', // Secondary text color
  placeholderText: '#999999', // Placeholder text color

  // UI element colors
  primary: '#4A90E2', // Primary accent color
  iconActive: '#4A90E2', // Active icon color
  iconInactive: '#666666', // Inactive icon color
  headerBackground: '#FFFFFF', // Header background
  messageBubbleUser: '#4A90E2', // User message bubble
  messageBubbleAI: '#F0F0F0', // AI message bubble

  // Additional UI colors
  border: '#E0E0E0', // Border color
  codeBlockBackground: '#F5F5F5', // Code block background
  loadingText: '#666666', // Loading indicator text
};

const darkColors = {
  // Background colors
  primaryBackground: '#1A1A1A', // From your ChatScreen background
  secondaryBackground: '#2A2A2A', // From your ChatHeader background
  inputBackground: '#3A3A3A', // From your ChatInput input field

  // Text colors
  primaryText: '#FFFFFF', // From various text elements
  secondaryText: '#CCCCCC', // Secondary text color
  placeholderText: '#999999', // From ChatInput placeholder

  // UI element colors
  primary: '#4A90E2', // From ChatInput send button
  iconActive: '#4A90E2', // Active icon color
  iconInactive: '#666666', // From your icons
  headerBackground: '#2A2A2A', // From ChatHeader
  messageBubbleUser: '#4A90E2', // From user message bubble
  messageBubbleAI: '#2A2A2A', // From AI message bubble

  // Additional UI colors
  codeBlockBackground: '#1E1E1E', // From code block styling
  loadingText: '#FFFFFF', // From LoadingIndicator
};

const fontSizes = {
  small: width * 0.04, // 16sp equivalent
  medium: width * 0.045, // 18sp equivalent
  large: width * 0.055, // For headers
  xlarge: width * 0.065, // For emphasis
};

const fontFamilies = {
  regular: 'Roboto-Regular',
  bold: 'Roboto-Bold',
  monospace: 'monospace',
};

const screen = {
  width,
  height,
};

// Get the current color scheme from the device
const colorScheme = Appearance.getColorScheme();

const constants = {
  light: {
    colors: lightColors,
    fontSizes,
    fontFamilies,
    screen,
  },
  dark: {
    colors: darkColors,
    fontSizes,
    fontFamilies,
    screen,
  },
};

// Export the current theme based on the color scheme
export default constants[colorScheme || 'light'];
