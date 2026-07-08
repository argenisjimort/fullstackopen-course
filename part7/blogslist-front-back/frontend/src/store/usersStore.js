import { create } from "zustand";
import usersService from '../services/users'
import users from "../services/users";



export const useUsersStore = create((set, get) => ({ //return this object
    users: [],
    getUsers: async () => {
        // const usersFromService = await usersService.getAll()
        // set({ users: usersFromService })
        set({ users: await usersService.getAll() })
    }
}))