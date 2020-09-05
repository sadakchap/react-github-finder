import React, { Fragment, useEffect, useContext } from 'react';
import Spinner from '../spinner/Spinner';
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';
import GithubContext from '../../context/github/githubContext';


const User = ({ match }) => {

    const githubContext = useContext(GithubContext);

    useEffect(() => {

        const username = match.params.login;
        githubContext.getUser(username);
        githubContext.getUserRepos(username);
        // eslint-disable-next-line
    }, []);

    const { loading, user, repos } = githubContext;

    const {
        name,
        login,
        bio,
        avatar_url,
        location,
        blog,
        html_url,
        followers,
        following,
        hireable,
        public_gists,
        public_repos,
        company
    } = user;


    if(loading){
        return (
            <Spinner />
        )
    }
    
    return <Fragment>
        <Link to="/" className="btn btn-light">Back To Search</Link>
        Hireable: {' '}
        {hireable ? <i className="fas fa-check text-success"></i> : <i className="fas fa-times-circle text-danger"></i> }
        <div className="card grid-2">
            <div className="all-center">
                <img src={avatar_url} alt={login} className="round-img" style={{ width: '150px'}} />
                <h1>{name}</h1>
                <p>Location: {location}</p>
            </div>
            <div>
                { bio && <Fragment>
                    <h3>Bio</h3>
                    <p>{bio}</p>
                </Fragment>}
                <a href={html_url} target="_blank" rel="noopener noreferrer" className="btn btn-dark my-1">Visit Gitgub Profile</a>

                <ul>
                    <li>
                        {login && <Fragment>
                            <strong>Username:</strong> {login}
                        </Fragment>}
                    </li>
                    <li>
                        {company && <Fragment>
                            <strong>Company: </strong> {company}
                        </Fragment>}
                    </li>
                    <li>
                        {blog && <Fragment>
                            <strong>Website: </strong> {blog}
                        </Fragment>}
                    </li>
                </ul>

            </div>
        </div>
        <div className="card text-center">
            <div className="badge badge-primary">Followers: {followers}</div>
            <div className="badge badge-success">Following: {following}</div>
            <div className="badge badge-light">Public Repos: {public_repos}</div>
            <div className="badge badge-dark">Public Gists: {public_gists}</div>
        </div>
        
        <Repos repos={repos} />

    </Fragment>
}

export default User
