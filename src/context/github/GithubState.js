import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import  {SEARCH_USERS, CLEAR_USERS, GET_USER, SET_LOADING, GET_REPOS } from '../types';

const GithubState = props => {
    const initialState = {
        user: {},
        users: [],
        loading: false,
        alert: null,
        repos: []
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // Search user

    // Get User

    // Get Repos

    // Clear Users

    // Set Loading

    return(
        <GithubContext.Provider 
            value={{
                users: state.users,
                user: state.user,
                loading: state.loading,
                repos: state.repos,
                alert: state.alert
            }}>
            {props.children}
        </GithubContext.Provider>
    )
};

export default GithubState;