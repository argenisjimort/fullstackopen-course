import {  useReducer, createContext, use, useContext } from "react"

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            return action.payload
        case 'REMOVE_MESSAGE':
            return ''
        
        default:
            return state
    }
}


const NotificationContext = createContext()




export const useNotification = () => {
    const {notificationDispatch} = useContext(NotificationContext)
    return (message, duration = 5) => {
        notificationDispatch({type: 'SET_MESSAGE', payload: message})
        setTimeout( () => notificationDispatch({type: 'REMOVE_MESSAGE'}), duration * 1000 )
    }
}




export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={{notification, notificationDispatch}}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext