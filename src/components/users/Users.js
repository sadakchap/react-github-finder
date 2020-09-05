import React, { useContext } from 'react'
import UserItem from './UserItem'
import Spinner from '../spinner/Spinner'
import GithubContext from '../../context/github/githubContext'


const Users = () =>  {

    const githubContext = useContext(GithubContext)

    const { users, loading } = githubContext;

    if(loading){
        return (<Spinner />)
    }else{ 
        return (<div style={userStyles}>
            {users.map( user => (
                <UserItem user={user} key={user.id} />
            ))}
        </div>)
    }
}

const userStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 300px ))'
}

export default Users
