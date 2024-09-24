import {useState} from "react";
import ThemeContext from "./ThemeContext.ts";

export const ThemeContextProvider = ({children}: any) => {
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

    return (
        <ThemeContext.Provider value={{isDarkTheme, setIsDarkTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};