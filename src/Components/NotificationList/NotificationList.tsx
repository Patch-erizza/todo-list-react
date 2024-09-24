import {useContext, useEffect, useState} from "react";
import {INotificationItem} from "../../models/INotificationItem.ts";
import {toast} from "react-toastify";
import classes from "./NotificationList.module.css";
import {NotificationInput} from "../NotificationInput/NotificationInput.tsx";
import {NotificationItem} from "../NotificationItem/NotificationItem.tsx";
import LanguageContext from "../../contexts/LanguageContext/LanguageContext.ts";

export const NotificationList = () => {
    const [notificationList, setNotificationList] = useState<INotificationItem[] | null>(null);
    const languageContext = useContext(LanguageContext);

    useEffect(() => {
        if (notificationList === null) {
            return
        }
        localStorage.setItem('notificationList', JSON.stringify(notificationList));
    }, [notificationList]);

    useEffect(() => {
        const notificationItemFromLS = localStorage.getItem('notificationList');
        if (notificationItemFromLS) {
            const retrievedNotificationList = JSON.parse(notificationItemFromLS);
            const parsedDate = retrievedNotificationList.map((item: any) => {
                const toReturn: INotificationItem = {
                    title: item.title, date: new Date(item.date), isExpired: item.isExpired
                }
                return toReturn
            })
            setNotificationList(parsedDate);
        } else {
            setNotificationList([])
        }
    }, []);

    useEffect(() => {
        const timeToNotification = setInterval(() => {
            if (notificationList) {
                const currentDate = new Date();
                for (let item of notificationList) {
                    const itemDate = item.date;
                    if ((currentDate.getTime() >= itemDate.getTime()) && !item.isExpired) {
                        item.isExpired = true;
                        const notificationListCopy = [...notificationList];
                        const searchItemToExpired = notificationListCopy.find((expiredItem) => item.title === expiredItem.title);
                        if (searchItemToExpired) {
                            searchItemToExpired.isExpired = true;
                            setNotificationList(notificationListCopy);
                            toast(item.title)
                        }
                    }
                }
            }
        }, 1000);
        return () => {
            clearInterval(timeToNotification)
        };
    }, [notificationList])

    const notificationInputTextChanged = (newNotificationItem: INotificationItem) => {
        if (notificationList === null) {
            setNotificationList([newNotificationItem])
        } else {
            setNotificationList([...notificationList, newNotificationItem])
        }
    }
    const notificationItemEditing = (item: INotificationItem, newTitle: string) => {
        if (notificationList === null) {
            return
        }
        const notificationListCopy = [...notificationList];
        const searchItemForEditing = notificationListCopy.find((editedItem) => item.title === editedItem.title);
        if (searchItemForEditing) {
            searchItemForEditing.title = newTitle;
            setNotificationList(notificationListCopy)
        }
    }
    const itemDeleted = (item: INotificationItem) => {
        if (notificationList === null) {
            return
        }
        const notificationListCopy = [...notificationList];
        const searchIndexItemToDelete = notificationListCopy.findIndex((notificationItem) => item.title === notificationItem.title);
        notificationListCopy.splice(searchIndexItemToDelete, 1);
        setNotificationList(notificationListCopy);
    }

    return (
        <>
            <div className={classes.notificationWrapper}>
                <span className={classes.spanNames}>
                    {languageContext?.language === 'ENG'
                        ?
                        'Your notifications:'
                        : 'Список ваших уведомлений:'}
                </span>
                <NotificationInput notificationInputChanged={notificationInputTextChanged}/>
                {
                    notificationList?.length
                        ?
                        notificationList
                            .map((item) =>
                                <NotificationItem
                                    key={item.title}
                                    item={item}
                                    notificationItemDelete={itemDeleted}
                                    onItemIsEdited={notificationItemEditing}/>)
                        : <span className={classes.isEmpty}>Notification list is empty</span>
                }
            </div>
        </>
    );
};