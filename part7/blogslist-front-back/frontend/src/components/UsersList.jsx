import { Link } from "react-router-dom"

const UsersList = ({users}) => {
    console.log( users )
    return (
        <div>
            <table>
                <thead>
                    <tr>

                        <th>Name</th>
                        <th>Username</th>
                        <th>Blogs created</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map(user => <tr key={user.id} >
                        <td>  <Link to={`${user.id}`}> {user.name} </Link>  </td>
                        <td> {user.username} </td>
                        <td> {user.blogs.length} </td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default UsersList