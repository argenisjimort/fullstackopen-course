import { create } from "zustand";



export const useMessagePrintStore = create( (set, get) => ({
    statusMessage: '',
    setMessage: ( payload ) => set({ statusMessage: payload }),
    removeMessage: () => set({ statusMessage: '' }),

    //gotta use get(). to call the other functions
    //as they are other methods of the store
    printStatusMessage: ( message, time = 5 ) => {
        get().setMessage(message)
        setTimeout( () => get().removeMessage(), time * 1000 )
    }
}) )