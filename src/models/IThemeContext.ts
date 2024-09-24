import {Dispatch, SetStateAction} from "react";

export interface IThemeContext {
    isDarkTheme: boolean,
    setIsDarkTheme: Dispatch<SetStateAction<boolean>>
}