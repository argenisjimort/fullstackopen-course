export const getUser = () => window.localStorage.getItem('loggedUser')
export const saveUser = (user) => window.localStorage.setItem('loggedUser', JSON.stringify(user) )
export const removeUSer = () => window.localStorage.removeItem('loggedUser')