
import React, {useState, useEffect, useContext, createContext} from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import DateFmt from './date-fmt.js';
import { AuthContext } from '../context/auth-context.js';
import { ErrorContext } from '../context/error-context.js';

const tradeOpts = [
	{ val: "open", text: "Unfilled Trades", url: "/api/userTrades/search/findByUserNameAndFillDateIsNullOrderByPostDateDesc?userName="}, 
	{ val: "filled", text: "Filled Trades", url: "/api/userTrades/search/findByUserNameAndFillDateIsNotNullOrderByPostDateDesc?userName="},
	{ val: "all", text: "All", url: "/api/userTrades/search/findByUserName?userName="}
]

const UserTrades = (props) => {
	//const trades = useUserTrades(tradeOpts[0].url, userName, []);
	const auth = useContext(AuthContext);
	const errCtx = useContext(ErrorContext);
	const [refreshTrades, setRefreshTrades] = useState(true);
	const [existingTradeType, setExistingTradeType] = useState(tradeOpts[0]);
	const [userTrades, setUserTrades] = useState([]);

	if (props.refresh && !refreshTrades)
		setRefreshTrades(true);

	useEffect(() => {
		if (refreshTrades) {
			const url = existingTradeType.url;
			fetch(url + auth.user.userName, { method: 'GET', headers: {"Content-Type": "application/json"}})
			.then(response => {
				if (response.ok)
					return response.json();
				else
					return response.json().then(err => { throw err });
			}).then(response => {
				const data = response._embedded.userTrades;
				setUserTrades(data);
				setRefreshTrades(false);
			}).catch(err => {
				setUserTrades([]);
				errCtx.addError(err);
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
