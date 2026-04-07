import { ThemeContext } from './ThemeContext.tsx';
import { useContext } from "react";

const useTheme = () => useContext(ThemeContext);

export { useTheme };