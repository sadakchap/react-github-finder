import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import './App.css';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/alertState';


const App = () => {

	return (
		<GithubState>
			
		<Router>
			<div className="App">
				<Navbar />
				<div className="container" style={{ minHeight: '100vh'}}>
					<AlertState>
						<Alert />
						<Switch>
							<Route 
								exact
								path='/'
								render={ props => 
									<Fragment>
										<Search />
										<Users />
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
									/>
								)}
							/>

					</Switch>

					</AlertState>
				</div>
			</div>
			</Router>
		</GithubState>
	);
}

export default App;
