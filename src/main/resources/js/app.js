'use strict';
import React, { useContext } from 'react';
import ReactDOM  from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './comp/login';
import CoinExchange from './comp/coin-exchange';
import { AuthContext, AuthProvider } from './context/auth-context';
import { ErrorProvider } from './context/error-context';

const isLoggedIn = () => {
	const auth = useContext(AuthContext);
	return auth.user && auth.user.email;
}
const Content = () => {
	return isLoggedIn() ? <CoinExchange /> : <Login />
	
}
const App = () => {

	return (
		<AuthProvider>
			<ErrorProvider>
				<Content />
			</ErrorProvider>
		</AuthProvider>
	)
}

export default App;

ReactDOM.render(<App />, document.getElementById('react'));

