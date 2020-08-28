import React from 'react'
import PropTypes from 'prop-types'

const UserItem = ({ user: { avatar_url, html_url, login}}) => {
    
    return (
        <div className="card text-center">
            <img src={avatar_url} alt="avatar_image" style={{
                width: '60px', borderRadius: '50%'
            }} />
            <p>{login}</p>
            <a href={html_url} target="_blank" rel="noopener noreferrer" className="btn btn-dark">More</a>
        </div>
    )
}

UserItem.defaultPropType = {
    user: PropTypes.object.isRequired,
}
export default UserItem
