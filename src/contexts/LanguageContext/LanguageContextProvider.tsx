import {useState} from "react";
import {Language} from "../../models/Language.ts";
import LanguageContext from "./LanguageContext.ts";


export const LanguageContextProvider = ({children}: any) => {
    const [language, setLanguage] = useState<Language>('RUS');

    return (
        <LanguageContext.Provider value={{language, setLanguage}}>
            {children}
        </LanguageContext.Provider>
    );
};