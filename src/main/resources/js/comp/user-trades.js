const client = require('../client');

import React, {useState, useEffect, useContext, createContext} from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import DateFmt from './date-fmt.js';

const tradeOpts = [
	{ val: "open", text: "Unfilled Trades", url: "/api/userTrades/search/findByUserNameAndFillDateIsNull?userName="}, 
	{ val: "filled", text: "Filled Trades", url: "/api/userTrades/search/findByUserNameAndFillDateIsNotNull?userName="},
	{ val: "all", text: "All", url: "/api/userTrades/search/findByUserName?userName="}
]

const UserTrades = (props) => {
	const userName = 'robr';
	//const trades = useUserTrades(tradeOpts[0].url, userName, []);
	const [existingTradeType, setExistingTradeType] = useState(tradeOpts[0]);
	const [userTrades, setUserTrades] = useState([]);
	
	useEffect(() => {
		const url = existingTradeType.url;
		client({method: 'GET'
			,path: url + userName
		}).then(response => {
			setUserTrades(response.entity._embedded.userTrades);
		});
	}, [existingTradeType]);

	
	const topts = tradeOpts.map((topt, idx) => 
		<option value={topt.val}>{topt.text}</option>
	);
	const tradetrs = userTrades.map((trade, idx) => 
		<TradeTr trade={trade} idx={idx} />
	);
	if (!tradetrs.length) {
		const noDataMsg = existingTradeType.val == 'all' ? 'No Existing Trades' : 'No ' + existingTradeType.text;
		tradetrs.push(<tr><td colSpan='5'>{noDataMsg}</td></tr>);
	}
	
	function completedTradeTypeChange(e) {
		const val = e.target.value;
		var topt;
		for (var x=0; x<tradeOpts.length; x++) {
			if (tradeOpts[x].val == val)
				topt = tradeOpts[x];
		}
		setExistingTradeType(topt);
	}
		return (
			<div id="usertrades">
			<select onChange={completedTradeTypeChange}>
				{topts}
			</select>
			<div>
				<div className="scrollable">
				<table className="std">
					<thead>
						<tr>
						<th>Date Posted</th>
						<th>Type</th>
						<th>Asset</th>
						<th>Qty</th>
						<th>Price</th>
						<th></th>
						</tr>
					</thead>
					<tbody>
						{tradetrs}
					</tbody>
				</table>
				</div>
			</div>
			</div>
		)
}

const TradeTr = (props) => {
	const t = props.trade;

	return (
		<tr>
			<td><DateFmt date={t.postDate} /></td>
			<td>{t.tradeTypeId}</td>
			<td>{t.assetId}</td>
			<td>{t.quantity}</td>
			<td>{t.price}</td>
			<td>{!t.fillDate && (<a href="#" style={{ color: "red" }}><FaTrashAlt /></a>)}</td>
		</tr>
	)
}

export {TradeTr};
export default UserTrades;
