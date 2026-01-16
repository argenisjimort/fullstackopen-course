import { createSlice } from "@reduxjs/toolkit"

const notificationSlicer = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotificationMessage(state , action) {
            return action.payload
        },

        removeNotificationMessage(state, action) {
            return ''
        },
    }
})


export const setNotificationAndTime = (message, timeInSeconds) => {
    return dispatch => {
        dispatch(setNotificationMessage(message))
        setTimeout( () => dispatch(removeNotificationMessage()), timeInSeconds * 1000 )
    }
}


export const { setNotificationMessage, removeNotificationMessage } = notificationSlicer.actions
export default notificationSlicer.reducer