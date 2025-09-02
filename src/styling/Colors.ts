import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

// Define your custom dark colors
const FinaselDarkColors = {
  primary: '#FFD700',      // Golden Yellow for buttons, active tabs, etc.
  background: '#1A2B3C',   // Charcoal Blue for screen backgrounds
  card: '#1A2B3C',         // Charcoal Blue for headers and tab bars
  text: '#F5F5F5',         // Off-White for all primary text
  border: '#3F4E5D',       // A subtle border color for headers
  notification: '#FFD700', // Color for badges or notifications
};

// Define your custom light colors
const FinaselLightColors = {
  primary: '#8B4513',      // Coppery brown for accents
  background: '#F2F2F2',   // Light Gray for screen backgrounds
  card: '#FFFFFF',         // White for headers and tab bars
  text: '#1A2B3C',         // Charcoal Blue for all primary text
  border: '#CCCCCC',       // A standard light border color
  notification: '#8B4513',
};

const Colors = {
  light: FinaselLightColors,
  dark: FinaselDarkColors,
};
export default Colors;
const FinanselDarkTheme = {
  ...NavigationDarkTheme,            
  colors: {
    ...NavigationDarkTheme.colors,    
    ...FinaselDarkColors,               
  },
};
const FinanselLightTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...FinaselLightColors,
  },
};
