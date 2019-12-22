'use strict';

import React, { useState, useEffect } from 'react';
import ReactDOM  from 'react-dom';

import Login from './comp/login';
import CoinExchange from './comp/coin-exchange';
import { AuthContext, getStoredUserAuth } from './context/auth-context';

const App = () => {
	const auth =  getStoredUserAuth();

	return (
		<AuthContext.Provider value={auth}>
			{auth && auth.id ? <CoinExchange /> : <Login />}
		</AuthContext.Provider>
	)
}

export default App;

ReactDOM.render(<App />, document.getElementById('react'));

