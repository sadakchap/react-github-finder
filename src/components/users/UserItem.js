import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const UserItem = ({ user: { avatar_url, html_url, login}}) => {
    
    return (
        <div className="card text-center">
            <img src={avatar_url} alt="avatar_image" style={{
                width: '60px', borderRadius: '50%'
            }} />
            <p>{login}</p>
            <Link to={`/user/${login}`} className="btn btn-dark">More</Link>
        </div>
    )
}

UserItem.defaultPropType = {
    user: PropTypes.object.isRequired,
}
export default UserItem
