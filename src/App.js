import React, { Component, Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import './App.css';
import Users from './components/users/Users';
import axios from 'axios';
import UserSearch from './components/users/UserSearch';
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from './components/pages/About';
import User from './components/users/User';


class App extends Component {

	state = {
		users: [],
		loading: false,
		alert: null,
		user: {},
		repos: []
	}

	searchUsers = async (query) => {
		this.setState({
			loading: true
		});
		
		const url = `https://api.github.com/search/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}&q=${query}`;

		try {
			const res = await axios.get(url);
			this.setState({
				users: res.data.items,
				loading: false
			});
			console.log(res.data.items);

		} catch (err) {
			console.log('ERROR WHILE SEARCHING FOR USERS');
			console.log(err);
		}
	}

	clearUsers = () => {
		this.setState({
			loading: false,
			users: []
		});
	}

	setAlert = (msg, type) => {
		console.log('setting alert')
		this.setState({
			alert: { msg, type}
		});
		setTimeout(() => {
			this.setState({ alert: null })
		}, 5000);
	}

	getUser = async (username) => {
		this.setState({ loading: true});
		const url = `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
		try {
			const res = await axios.get(url);
			console.log(res.data);
			this.setState({
				loading: false,
				user: res.data
			});
		} catch (err) {
			console.log('ERROR WHILE FETCHING A USER DATA');
			console.log(err);
		}
	}

	getUserRepos = async (username) => {
		this.setState({ loading: true});
		const url = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
		try {
			const res = await axios.get(url);
			this.setState({
				repos: res.data,
				loading: false
			});
		} catch (err) {
			console.log('Error while fetching user REPOS');
			console.log(err);
		}
	}

	render() {
		return (
			<Router>
				<div className="App">
					<Navbar />
					<div className="container" style={{ minHeight: '100vh'}}>
						<Alert alert={this.state.alert} />
						<Switch>
							<Route 
								exact
								path='/'
								render={ props => 
									<Fragment>
										<UserSearch 
											searchUsers={this.searchUsers} 
											clearUsers={this.clearUsers}
											showClear={this.state.users.length > 0 ? true : false} 
											setAlert={this.setAlert}
										/>
										<Users loading={this.state.loading} users={this.state.users} />
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
										getUser={this.getUser} 
										user={this.state.user} 
										loading={this.state.loading} 
										getUserRepos={this.getUserRepos}
										repos={this.state.repos}
									/>
								)}
							/>

						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
