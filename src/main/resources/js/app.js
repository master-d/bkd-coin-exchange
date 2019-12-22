'use strict';

import React, { useState, useEffect } from 'react';
import ReactDOM  from 'react-dom';

import Login from './comp/login';
import CoinExchange from './comp/coin-exchange';
import { AuthContext } from './context/auth-context';

const App = () => {
	const { auth } = useContext("authContext");
}

ReactDOM.render(
	<App>
		<AuthContext.Provider>
			<h1 style='color: white'>fuck it</h1>
			{auth && auth.id ? <CoinExchange /> : <Login />}
		</AuthContext.Provider>
	</App>,
	document.getElementById('react')
)

export default App;
