import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Search = ({ searchUsers, setAlert, showClear, clearUsers }) => {

    const [text, setText] = useState('');
    

    const handleChange = (e) => setText(e.target.value);

    const onFormSubmit = (e) => {
        e.preventDefault();
        if(text){
            searchUsers(text);
            setText('')
        }else{
            // handle empty request
            setAlert('Please enter something', 'light');
        }
    }

    return (
        <div>
            <form className="form" onSubmit={onFormSubmit}>
                <input type="text" name="text" id="" placeholder="Search Users..." value={text}  onChange={handleChange}/>
                <input type="submit" value="Search" className="btn btn-dark btn-block" />
            </form>
            {showClear ? <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button> : ''}
            
        </div>
    );
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
};

export default Search
