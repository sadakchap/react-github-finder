import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import './App.css';
import Users from './components/users/Users';
import axios from 'axios';
import UserSearch from './components/users/UserSearch';


class App extends Component {

	state = {
		users: [],
		loading: false
	}

	async componentDidMount(){
		this.setState({ loading: true })
		const url = `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
		
		try {
			const res = await axios.get(url);
			this.setState({ loading: false, users: res.data})
			
		} catch (err) {
			console.log('ERROR WHILE FECTHING USER DATA');
			console.log(err);
		}
	}

	render() {
		return (
		<div className="App">
			<Navbar />
			<UserSearch />
			<div className="container" style={{ minHeight: '100vh'}}>
				<Users loading={this.state.loading} users={this.state.users} />
			</div>
		</div>
		);
	}
}

export default App;
