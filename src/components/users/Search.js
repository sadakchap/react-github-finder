import React, { useState } from 'react'
import GithubContext from '../../context/github/githubContext';
import { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';


const Search = () => {

    const githubContext = useContext(GithubContext);
    const { setAlert } = useContext(AlertContext);

    const [text, setText] = useState('');

    const showClear = githubContext.users.length > 0 ? true : false
    
    const handleChange = (e) => setText(e.target.value);

    const onFormSubmit = (e) => {
        e.preventDefault();
        if(text){
            githubContext.searchUsers(text);
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
            {showClear ? <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button> : ''}
            
        </div>
    );
}


export default Search
