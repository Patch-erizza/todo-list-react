import {createContext} from "react";
import {ILanguageContext} from "../../models/ILanguageContext.ts";

const LanguageContext = createContext<ILanguageContext | null>(null);
export default LanguageContext;