import { createContext, useReducer } from "react";
const NotificationContext = createContext()


const notificationReducer = (state, action) => {
    switch(action.type) { 
        case 'SET_NOTIFICATION': {
            const message = action.payload
            return message
        }
        case 'CLEAR_NOTIFICATION':
            return ''
        default:
            return state

    }
}

export const addNotification =(message) =>{
    return {
        type: 'SET_NOTIFICATION',
        payload: message
    }
}

export const clearNotification = () =>({ type: 'CLEAR_NOTIFICATION' })


export const NotificationContextProvider = (props) =>{
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')
    return (
        <NotificationContext.Provider value = {{notification, notificationDispatch}}>
            {props.children}
        </NotificationContext.Provider>
    )
}


export default NotificationContext