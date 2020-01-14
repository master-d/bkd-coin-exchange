
import React, {useState, useEffect, useContext, createContext} from 'react';
import { FaBitcoin, FaComments, FaCommentsDollar, FaDollarSign, FaChartLine } from 'react-icons/fa';
import UserTrades from './user-trades.js';
import FetchOptions from "../conf/fetch-options";
import { AuthContext } from '../context/auth-context.js';
import Errors from "./errors";
import { ErrorContext } from "../context/error-context";


function useTradeTypes(getData, defaultData) {
	const auth = useContext(AuthContext);
	const errCtx = React.useContext(ErrorContext);

	const [tradeTypes, setTradeTypes] = useState(defaultData);
	const getOptions = FetchOptions('GET');

	useEffect(() => {
//		fetch('/api/tradeTypes', { method: 'GET', headers: {addError 'Content-Type': 'application/json', 'Authorization': "Bearer " + auth.user.jwt}} )
		fetch('/api/tradeTypes', { ...getOptions })
		.then(response => {
			if (response.ok)
				return response.json();
			else
				throw Error(response.statusText);
		}).then(tradeTypes => {
			setTradeTypes(tradeTypes);
		}).catch(err => {
			setTradeTypes([]);
			errCtx.addError(err);
		});

	}, [getData]);
	return tradeTypes;
}
function useOrderTypes(getData, defaultData) {
	const [orderTypes, setOrderTypes] = useState(defaultData);
	const getOptions = FetchOptions('GET');
	const errCtx = React.useContext(ErrorContext);
	
	useEffect(() => {
		fetch('/orderTypes', { ...getOptions })
		.then(response => {
			if (response.ok)
				return response.json();
			else
				throw Error(response.statusText);
		}).then(orderTypes => {
			setOrderTypes(orderTypes);
		}).catch(err => {
			setOrderTypes([]);
			errCtx.addError(err);
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
	const [errors, addError] = useState(null);
	const [refreshTrades, setRefreshTrades] = useState(false);
	const [marketValue, setMarketValue] = useState(null);
	const getOptions = FetchOptions('GET');
	
	useEffect(() => {
		// go get the current market value and display it for the user
		if (selectedOrderType == "MARKET") {
			fetch('/trades/market/' + selectedTradeType + "/" + selectedAsset, { ...getOptions })
			.then(response => {
				if (response.ok)
					return response.json();
				else
					throw Error(response.statusText);
			}).then(trade => {
				setMarketValue(trade);
			}).catch(err => {
				setMarketValue(null);
				errCtx.addError(err);
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
		fetch('/trades', { ...FetchOptions('POST'), body: JSON.stringify(data) })
		.then(response => {
			if (response.ok)
				return response.json();
			else
				throw Error(response.statusText);
		}).then(response => {
			setRefreshTrades(true);
		}).catch(response => {
			errCtx.addError(err);
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
	        <Errors/>
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
						{selectedOrderType == "MARKET" ? (<span>{marketValue ? " (market price $" + marketValue.price + ")" : ""}</span>) : 
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
