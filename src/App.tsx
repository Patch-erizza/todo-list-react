import classes from "./App.module.css"
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {TodoList} from "./Components/TodoList/TodoList.tsx";
import {NotificationList} from "./Components/NotificationList/NotificationList.tsx";
import {NawBar} from "./Components/NawBar/NawBar.tsx";
import "@theme-toggles/react/css/Classic.css"
import {useContext} from "react";
import ThemeContext from "./contexts/ThemeContext/ThemeContext.ts";
import {clsx} from "clsx";

function App() {
    const themeContext = useContext(ThemeContext);
    return (
<>
        <NawBar/>
    <div className={clsx(classes.root, {[classes._isDark]: themeContext?.isDarkTheme})}>
        <TodoList/>
        <NotificationList/>
        <ToastContainer/>
    </div>
</>
)
}

export default App
