import { create } from "zustand";
import loginService from "../services/login"
import { getUser } from "../services/persistentUser";
import { saveUser } from "../services/persistentUser";
import { removeUSer } from "../services/persistentUser";

export const useLoggedUserStore = create( (set, get) => ({
    isLoggedIn: false,
    hasCheckedAuth: false,
    loggedUser: {},
    checkForLogin: () => {
        const localStorageUser = getUser()
        //console.log(localStorageUser)
        if (localStorageUser) {
            const parsed = JSON.parse(localStorageUser)
            set( { isLoggedIn: true, loggedUser: parsed, hasCheckedAuth: true } )
        } else {
            set( { isLoggedIn: false, loggedUser: {}, hasCheckedAuth: true } )
        }
    },
    logIn: async (username, password) => {
        const res = await loginService.login({ username, password })
        saveUser(res)
        set({ isLoggedIn: true, loggedUser: res })
    },
    logOut: () => {
        set({ isLoggedIn: false, loggedUser: {} })
        removeUSer()
    }
}) )