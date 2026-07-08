import { useEffect } from 'react'
import { useUsersStore } from '../store/usersStore'
import UsersList from '../components/UsersList'
const UsersPage = () => {


    const users = useUsersStore(state => state.users)
    const getUsers = useUsersStore(state => state.getUsers)
    //console.log(users)



    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className='general-content-wrapper' >
            <div className="content">

                <h2>Users List</h2>
                {users && (
                    <UsersList users={users} />
                )}
            </div>
        </div>

    )
}

export default UsersPage