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
	const [refreshTrades, setRefreshTrades] = useState(props.refresh);
	const [existingTradeType, setExistingTradeType] = useState(tradeOpts[0]);
	const [userTrades, setUserTrades] = useState([]);
	
	useEffect(() => {
		if (refreshTrades) {
			const url = existingTradeType.url;
			client({method: 'GET'
				,path: url + userName
			}).then(response => {
				setUserTrades(response.entity._embedded.userTrades);
				setRefreshTrades(false);
			});
		}
	}, [refreshTrades]);

	
	const topts = tradeOpts.map((topt, idx) => 
		<option value={topt.val}>{topt.text}</option>
	);
	const tradetrs = userTrades.map((trade, idx) => 
		<TradeTr trade={trade} idx={idx} setRefreshTrades={setRefreshTrades}/>
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
		setRefreshTrades(true);
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

	function deleteTrade(e) {
		e.preventDefault();
		fetch('/trades/' + t.id, { method: 'DELETE', headers: {"Content-Type": "application/json"}})
		.then(response => {
			console.log("trade deleted");
			props.setRefreshTrades(true);
		});
	}

	return (
		<tr data-id={t.id}>
			<td><DateFmt date={t.postDate} /></td>
			<td>{t.tradeTypeId}</td>
			<td>{t.assetId}</td>
			<td>{t.quantity}</td>
			<td>{t.price}</td>
			<td>{!t.fillDate && (<a href="#" onClick={deleteTrade} style={{ color: "red" }}><FaTrashAlt /></a>)}</td>
		</tr>
	)
}

export {TradeTr};
export default UserTrades;
