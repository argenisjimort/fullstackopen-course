import { create } from "zustand";
import { getTheme, setTheme } from "../services/themePersistance";


export const useThemeStore = create( (set, get) => {
    return {
        theme: 'lightmode',
        changeTheme: () => {
            get().theme === 'lightmode' ? set({theme: 'darkmode'}) : set({theme: 'lightmode'})
            setTheme( get().theme )
        },
        checkTheme: () => {
            const localTheme = getTheme()
            localTheme ? set({theme: localTheme}) : set({theme: 'lightmode'})
        }
    }
} )