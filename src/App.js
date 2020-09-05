import React from 'react';
import Navbar from './components/layout/Navbar';
import './App.css';
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/alertState';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';

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
								component={Home}
							/>

							<Route 
								exact
								path='/about'
								component={About}
							/>

							<Route 
								exact
								path={`/user/:login`}
								component={User}
							/>

							<Route component={NotFound} />

					</Switch>

					</AlertState>
				</div>
			</div>
			</Router>
		</GithubState>
	);
}

export default App;
