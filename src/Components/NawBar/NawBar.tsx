import classes from './NawBar.module.css'
import {FormEvent, useContext} from "react";
import {Classic} from "@theme-toggles/react"
import ThemeContext from "../../contexts/ThemeContext/ThemeContext.ts";
import LanguageContext from "../../contexts/LanguageContext/LanguageContext.ts";
import {Language} from "../../models/Language.ts";

export const NawBar = () => {
    const languageContext = useContext(LanguageContext);
    const themeContext = useContext(ThemeContext);

    const languageChanged = (event: FormEvent<HTMLSelectElement>) => {
        languageContext?.setLanguage(event.currentTarget.value as Language)
    }
    return (
        <div className={classes.nawBar}>
            <div className={classes.logoText}>ToDo & Notifications</div>
            <div>
                <div className={classes.currentUser}></div>
                {
                    themeContext
                        ?
                        <Classic
                            placeholder=''
                            onPointerEnterCapture=''
                            onPointerLeaveCapture=''
                            toggled={themeContext.isDarkTheme}
                            toggle={themeContext.setIsDarkTheme}
                            duration={750}/>
                        : null
                }
                {
                    languageContext
                        ?
                        <select
                            className={classes.language}
                            value={languageContext?.language}
                            onChange={languageChanged}>
                            <option value='RUS'>RUS</option>
                            <option value='ENG'>ENG</option>
                        </select>
                        : null
                }
            </div>
        </div>
    );
};