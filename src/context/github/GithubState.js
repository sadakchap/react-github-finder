import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import  { SEARCH_USERS, CLEAR_USERS, GET_USER, SET_LOADING, GET_REPOS } from '../types';

let githubClientId, githubClientSecret;

if(process.env.NODE_ENV !== "production"){
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
}else{
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

// Context Provider
const GithubState = props => {
    const initialState = {
        user: {},
        users: [],
        loading: false,
        repos: []
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // Search user
    const searchUsers = async (query) => {
        setLoading();

        const url = `https://api.github.com/search/users?client_id=${githubClientId}&client_secret=${githubClientSecret}&q=${query}`;

        try {
            const res = await axios.get(url);
            dispatch({ type: SEARCH_USERS, payload: res.data.items });
        } catch (err) {
            console.log('ERROR WHILE SEARCHING FOR USERS');
            console.log(err);
        }
    }

    // Get User
    const getUser = async (username) => {

        setLoading();

        const url = `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`;

        try {
            const res = await axios.get(url);
            dispatch({
                type: GET_USER,
                payload: res.data
            });
        } catch (err) {
            console.log('ERROR WHILE FETCHING A USER DATA');
            console.log(err);
        }
    }
    // Get Repos
    const getUserRepos = async (username) => {
        setLoading();
        const url = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`;
        try {
            const res = await axios.get(url);
            dispatch({
                type: GET_REPOS,
                payload: res.data
            })
        } catch (err) {
            console.log('Error while fetching user REPOS');
            console.log(err);
        }
    }

    // Clear Users
    const clearUsers = () => {
        dispatch({
            type: CLEAR_USERS
        });
    }

    
    // Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING });
    
    
    return(
        <GithubContext.Provider 
            value={{
                users: state.users,
                user: state.user,
                loading: state.loading,
                repos: state.repos,
                alert: state.alert,
                searchUsers,
                getUser,
                getUserRepos,
                clearUsers
            }}>
            {props.children}
        </GithubContext.Provider>
    )
};

export default GithubState;