import React from 'react'
import UserItem from './UserItem'
import Spinner from '../spinner/Spinner'
import PropTypes from 'prop-types'


const Users = ({ users, loading }) =>  {

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

Users.propType = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
}

const userStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 300px ))'
}

export default Users
