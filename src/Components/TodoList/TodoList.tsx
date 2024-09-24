import classes from "./TodoList.module.css"
import {useContext, useEffect, useState} from "react";
import {ITodoItem} from "../../models/ITodoItem.ts";
import {TodoInput} from "../TodoInput/TodoInput.tsx";
import {TodoItem} from "../TodoItem/TodoItem.tsx";
import LanguageContext from "../../contexts/LanguageContext/LanguageContext.ts";

export const TodoList = () => {
    const [todoList, setTodoList] = useState<ITodoItem[] | null>(null);
    const [completedTodoList, setCompletedTodoList] = useState<ITodoItem[] | null>(null);

    const languageContext = useContext(LanguageContext);

    useEffect(() => {
        if (todoList === null) {
            return
        }
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }, [todoList]);

    useEffect(() => {
        if (completedTodoList === null) {
            return
        }
        localStorage.setItem('completedTodoList', JSON.stringify(completedTodoList));
    }, [completedTodoList]);

    useEffect(() => {
        const todoListFromLS = localStorage.getItem('todoList');
        if (todoListFromLS) {
            const retrievedTodoList = JSON.parse(todoListFromLS);
            setTodoList(retrievedTodoList)
        } else {
            setTodoList([])
        }
        const completedTodoListFromLS = localStorage.getItem('completedTodoList');
        if (completedTodoListFromLS) {
            const retrievedCompletedTodoList = JSON.parse(completedTodoListFromLS);
            setCompletedTodoList(retrievedCompletedTodoList)
        } else {
            setCompletedTodoList([])
        }
    }, []);

    const inputTextChanged = (inputText: string) => {
        const newTodoItem: ITodoItem = {title: inputText, isChecked: false};
        if (todoList === null) {
            return
        }
        setTodoList([...todoList, newTodoItem]);
    }
    const itemIsChecked = (item: ITodoItem) => {
        //item.isChecked = true;
        //setTodoList([...todoList])
        if (todoList === null || completedTodoList === null) {
            return
        }
        const todoListCopy = [...todoList];
        const searchedTodoItem = todoListCopy.findIndex((todoItem) => item.title === todoItem.title);
        if (searchedTodoItem > -1) {
            todoListCopy.splice(searchedTodoItem, 1);
            setTodoList(todoListCopy);
            item.isChecked = !item.isChecked;
            setCompletedTodoList([...completedTodoList, item])
        }
    }
    const itemIsCheckedComplete = (item: ITodoItem) => {
        if (todoList === null || completedTodoList === null) {
            return
        }
        const todoListCopy = [...completedTodoList];
        const searchedTodoItem = todoListCopy.findIndex((todoItem) => item.title === todoItem.title);
        if (searchedTodoItem > -1) {
            todoListCopy.splice(searchedTodoItem, 1);
            setCompletedTodoList(todoListCopy);
            item.isChecked = !item.isChecked;
            setTodoList([...todoList, item])
        }
    }
    //найти индекс массива, сплайс по индексу
    const itemDeleted = (item: ITodoItem) => {
        if (todoList === null) {
            return
        }
        const todoListCopy = [...todoList];
        const searchIndexItemToDelete = todoListCopy.findIndex((todoItem) => item.title === todoItem.title);
        todoListCopy.splice(searchIndexItemToDelete, 1);
        setTodoList(todoListCopy);
    }
    const itemCompleteDeleted = (item: ITodoItem) => {
        if (completedTodoList === null) {
            return
        }
        const completeTodoListCopy = [...completedTodoList];
        const searchIndexItemToDelete = completeTodoListCopy.findIndex((completeTodoItem) => item.title === completeTodoItem.title);
        completeTodoListCopy.splice(searchIndexItemToDelete, 1);
        setCompletedTodoList(completeTodoListCopy);
    }
    const itemEditing = (item: ITodoItem, newTitle: string) => {
        if (todoList === null) {
            return
        }
        const todoListCopy = [...todoList];
        const searchItemForEditing = todoListCopy.find((editedItem) => item.title === editedItem.title);
        if (searchItemForEditing) {
            searchItemForEditing.title = newTitle;
            setTodoList(todoListCopy)
        }
    }
    return (
        <>
            <div className={classes.todoListWrapper}>
                <span className={classes.spanNames}>
                    {languageContext?.language === 'ENG'
                        ?
                        'Your ToDo list:'
                        :'Список дел:'}
                </span>
                <TodoInput inputChanged={inputTextChanged}/>
                <div>
                    {
                        todoList?.length
                            ?
                            todoList
                                .map((item) =>
                                    <TodoItem
                                        key={item.title}
                                        item={item}
                                        onCheckedChanged={itemIsChecked}
                                        todoItemDelete={itemDeleted}
                                        onItemIsEdited={itemEditing}/>)
                            : <span className={classes.isEmpty}>ToDo list is empty</span>
                    }
                </div>
                {
                    completedTodoList?.length
                        ?
                        <hr/>
                        : null
                }
                <div>
                    {
                        completedTodoList
                            ?
                            completedTodoList
                                .map((item) =>
                                    <TodoItem
                                        key={item.title}
                                        item={item}
                                        onCheckedChanged={itemIsCheckedComplete}
                                        todoItemDelete={itemCompleteDeleted}
                                        className={classes.completedItems}/>)
                            : null
                    }
                </div>
            </div>
        </>
    );
};