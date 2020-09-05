import { SEARCH_USERS, CLEAR_USERS, GET_USER, SET_LOADING, GET_REPOS } from '../types';

export default (state, action) => {
    switch(action.type){
        case SEARCH_USERS:
            return { ...state, users: action.payload, loading: false };
        case SET_LOADING:
            return { ...state, loading: true};
        case CLEAR_USERS:
            return { ...state, users: [], loading: false };
        case GET_USER:
            return {...state, user: action.payload, loading: false};
        case GET_REPOS:
            return { ...state, repos: action.payload, loading: false};
        default:
            return state;
    }
}
