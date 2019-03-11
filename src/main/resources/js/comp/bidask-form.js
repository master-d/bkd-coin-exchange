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
function useOrderTypes(getData, defaultData) {
	const [orderTypes, setOrderTypes] = useState(defaultData);
	
	useEffect(() => {
		client({method: 'GET', path: '/api/orderTypes'}).then(response => {
			setOrderTypes(response.entity._embedded.orderTypes);
		});
	}, [getData]);
	return orderTypes;
}

const BidAskForm = (props) => {
	
	const tradeTypes = useTradeTypes(null,[]);
	const [selectedTradeType, setSelectedTradeType] = useState("ASK");
	const orderTypes = useOrderTypes(null,[]);
	const [selectedOrderType, setSelectedOrderType] = useState("LIMIT");
	const [selectedAsset, setSelectedAsset] = useState(1);
	const [errors, setErrors] = useState(null);
	const [refreshTrades, setRefreshTrades] = useState(false);
	const [marketValue, setMarketValue] = useState({ price: "?"});
	
	useEffect(() => {
		// go get the current market value and display it for the user
		if (selectedOrderType == "MARKET") {
			fetch('/trades/market/' + selectedTradeType + "/" + selectedAsset, { method: 'GET' })
			.then(response => {
				if (response.ok)
					return response.json();
				else
					throw Error(response);
			}).then(trade => {
				setMarketValue(trade);
			}).catch(response => {
				setErrors(response);
			});
		}
	}, [selectedAsset,selectedOrderType,selectedTradeType]);
	function handleSubmit(e) {
		e.preventDefault();
		setRefreshTrades(false);
		const fd = new FormData(e.target);
		var data = {};
		fd.forEach(function(value, key) {
			if (value.match(/^[0-9.]+$/))
				value = +value;
			data[key] = value;
		});
		fetch('/trades', { method: 'POST', body: JSON.stringify(data), headers: {"Content-Type": "application/json"}})
		.then(response => {
			if (response.ok)
				return response.json();
			else
				throw Error(response);
		}).then(response => {
			setRefreshTrades(true);
		}).catch(response => {
			setErrors(response);
		});
	}
	function tradeTypeChange(e) {
		setSelectedTradeType(e.target.value);
	}
	function assetChange(e) {
		setSelectedAsset(e.target.value);
	}
	function orderTypeChange(e) {
		var val = e.target.value;
		setSelectedOrderType(val);
	}
	function getCurrentMarketRate() {

	}
	
	const tradeOpts = tradeTypes.map((tt,idx) => 
		<option key={tt._links.self.href} value={tt.id}>{tt.description}</option>
	)
	const orderOpts = orderTypes.map((ot,idx) => 
		<option key={ot._links.self.href} value={ot.id}>{ot.description}</option>
	)
	const assets = props.assets.map((asset,idx) =>
		<option key={asset._links.self.href} value={asset.id}>{asset.name}</option>
	);
		return (
			<div id="bidaskform" className="container" style={{display: "none"}}>
			<UserTrades refresh={refreshTrades}/>
			<h4>Order</h4>
			<form id="bidask-form" onSubmit={ handleSubmit }>
				{errors && 
					(<div className="errors">{errors.message}<br/><br/>{errors.trace}</div>)
				}
				<div>
					<select name="tradeTypeId" onChange={tradeTypeChange}>
						{tradeOpts}
					</select>
					<select name="assetId" onChange={assetChange}>
						{assets}
					</select>
					<input type="number" min="1" placeholder="quantity" name="quantity" defaultValue="1" style={{width: "3em"}}/>
					<select name="orderTypeId" onChange={orderTypeChange}>
						{orderOpts}
					</select>
						{selectedOrderType == "MARKET" ? (<span> (current market price ${marketValue.price})</span>) : 
						(<input type="number" min=".01" step=".01" placeholder="price" name="price" style={{width: "5em"}}/>)}
				</div>
				<div className="div-buttons">
					<button type="submit" className="button">Submit</button>
				</div>
			</form>
			</div>
		)
}

export default BidAskForm;
