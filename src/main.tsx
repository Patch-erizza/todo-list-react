import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ThemeContextProvider} from "./contexts/ThemeContext/ThemeContextProvider.tsx";
import {LanguageContextProvider} from "./contexts/LanguageContext/LanguageContextProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeContextProvider>
            <LanguageContextProvider>
                <App/>
            </LanguageContextProvider>
        </ThemeContextProvider>
    </StrictMode>,
)
