import {createContext} from "react";
import {IThemeContext} from "../../models/IThemeContext.ts";

const ThemeContext = createContext<IThemeContext | null>(null);
export default ThemeContext;