import classes from "./TodoInput.module.css";
import {FC, FormEvent, useContext, useState} from "react";
import LanguageContext from "../../contexts/LanguageContext/LanguageContext.ts";

export interface TodoInputProps {
    inputChanged: (value: string) => void
}

export const TodoInput: FC<TodoInputProps> = (
    {
        inputChanged
    }) => {
    const [inputValue, setInputValue] = useState<any>('');

    const languageContext = useContext(LanguageContext);

    const handleChange = (event: FormEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    };
    const handleKeyUp = (event: any) => {
        if (event.key === 'Enter') {
            inputChanged(inputValue)
            setInputValue('')
        }
    }

    return (
        <>
            <input
                className={classes.inputText}
                value={inputValue}
                onChange={handleChange}
                placeholder={languageContext?.language === 'ENG'
                    ? 'Add new item...'
                    : 'Добавить задачу'}
                onKeyUp={handleKeyUp}/>
        </>
    );
};