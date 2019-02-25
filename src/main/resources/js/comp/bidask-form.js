const client = require('../client');

import React, {useState, useEffect, useContext, createContext} from 'react';
import { FaBitcoin, FaComments, FaCommentsDollar, FaDollarSign, FaChartLine } from 'react-icons/fa';
import UserTrades from './user-trades.js';

function useTradeTypes(getData, defaultData) {
	const [tradeTypes, setTradeTypes] = useState(defaultData);
	
	useEffect(() => {
		client({method: 'GET', path: '/api/tradeTypes'}).then(response => {
			setTradeTypes(response.entity._embedded.tradeTypes);
		});
	}, [getData]);
	return tradeTypes;
}

const BidAskForm = (props) => {
	
	function handleSubmit() {
	}
	
	const tradeTypes = useTradeTypes(null,[]);
	const assets = props.assets.map((asset,idx) =>
		<option key={asset._links.self.href} value={asset.id}>{asset.name}</option>
	);
		return (
			<div id="bidaskform" className="container" style={{display: "none"}}>
			<UserTrades />
			<form id="bidask-form" onSubmit={ handleSubmit }>
				<div>
					<select name="asset_id">
						<option value="">- Asset Type -</option>
						{assets}
					</select>
					<input type="number" placeholder="value" name="value" />
					<input type="number" name="quantity" defaultValue="1"/>
				</div>
			</form>
			</div>
		)
}

export default BidAskForm;
