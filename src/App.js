import React, { useState, Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import './App.css';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/github/GithubState';


const App = () => {

	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);
	const [user, setUser] = useState({});
	const [repos, setRepos] = useState([]);


	const searchUsers = async (query) => {
		setLoading(true);
		
		const url = `https://api.github.com/search/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}&q=${query}`;

		try {
			const res = await axios.get(url);
			setUsers(res.data.items);
			setLoading(false);

		} catch (err) {
			console.log('ERROR WHILE SEARCHING FOR USERS');
			console.log(err);
		}
	}

	const clearUsers = () => {
		// setLoading(false);
		setUsers([]);
	}

	const updateAlert = (msg, type) => {
		console.log('setting alert');
		setAlert({ msg, type });
		setTimeout(() => {
			setAlert(null);
		}, 5000);
	}

	const getUser = async (username) => {
		
		setLoading(true);

		const url = `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
		
		try {
			const res = await axios.get(url);
			console.log(res.data);
			setLoading(false)
			setUser(res.data);
		} catch (err) {
			console.log('ERROR WHILE FETCHING A USER DATA');
			console.log(err);
		}
	}

	const getUserRepos = async (username) => {
		setLoading(true);
		const url = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
		try {
			const res = await axios.get(url);
			setRepos(res.data);
			setLoading(false);
		} catch (err) {
			console.log('Error while fetching user REPOS');
			console.log(err);
		}
	}

	return (
		<GithubState>
			
		<Router>
			<div className="App">
				<Navbar />
				<div className="container" style={{ minHeight: '100vh'}}>
					<Alert alert={alert} />
					<Switch>
						<Route 
							exact
							path='/'
							render={ props => 
								<Fragment>
									<Search 
										searchUsers={searchUsers} 
										clearUsers={clearUsers}
										showClear={users.length > 0 ? true : false} 
										setAlert={updateAlert}
									/>
									<Users loading={loading} users={users} />
								</Fragment>
							}
						/>

						<Route 
							exact
							path='/about'
							component={About}
						/>

						<Route 
							exact
							path={`/user/:login`}
							render={ props => (
								<User 
									{ ...props} 
									getUser={getUser} 
									user={user} 
									loading={loading} 
									getUserRepos={getUserRepos}
									repos={repos}
								/>
							)}
						/>

					</Switch>
				</div>
			</div>
			</Router>
		</GithubState>
	);
}

export default App;
