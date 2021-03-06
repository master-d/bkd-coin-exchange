'use strict';

import React, { useState, useEffect, useContext } from 'react';
import ReactDOM  from 'react-dom';
import { Button } from 'reactstrap';

import {AuthContext} from '../context/auth-context';
import NavList, { NavItem } from './nav.js';
import BidAskForm from './bidask-form.js';

import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';
import Errors from "./errors";
import { ErrorContext } from "../context/error-context";


ReactChartkick.addAdapter(Chart);


const CoinExchange = () => {

	const auth = useContext(AuthContext);
	const errCtx = useContext(ErrorContext);
	const [assets, setAssets] = useState([]);
	const [selectedAsset, setSelectedAsset] = useState(null);
	const [trades, setTrades] = useState([]);
	
	const tabs = [ { text: "Chart", icon: "chart", key: "chart" },
		{ text: "Buy/Sell", icon: "bidaskform", key: "bidaskform" },
		{text: "Messages", icon: "messages", key: "messages" }];
	const assetUrl = "/api/assets";
	const tradesUrl = "/api/userTrades/search/findByAssetIdAndFillByTradeIdIsNotNullAndFillDateIsNotNull?assetId=";

	useEffect(() => {
		fetch(assetUrl, { method: 'GET', headers: {"Content-Type": "application/json"}})
		.then(response => {
			if (response.ok)
				return response.json();
			else
				throw Error(response);
		}).then(response => {
			const data = response.entity._embedded.assets;
			setAssets(data);
			if (data.length) {
				setSelectedAsset(data[0]);
			}
		}).catch(response => {
			errCtx.addError(response);
		});
	}, [assetUrl]);
	
	useEffect(() => {
		if (selectedAsset) {
			fetch(tradesUrl + selectedAsset.id, { method: 'GET', headers: {"Content-Type": "application/json"}})
			.then(response => {
				if (response.ok)
					return response.json();
				else
					throw Error(response);
			}).then(response => {
				var chartdata = response.entity._embedded.userTrades;
				setTrades(chartdata.map(t => [new Date(t.fillDate),t.price]));
			}).catch(response => {
				errCtx.addError(response);
			});
		}
	}, [selectedAsset]);
		
	function handleNavClick(item) {
		console.log(item.type + " click:" + JSON.stringify(item));
		if (item.type == "tab") {
			for (var x=0; x<tabs.length; x++) {
				var disp = item.icon == tabs[x].icon ? "block" : "none";
				document.getElementById(tabs[x].icon).style.display = disp;
			}
		} else if (item.type == "asset") {
			setSelectedAsset(assets.find(x => x.id == item.id));
		}
	}

	const navAssets = assets.map((asset, idx) =>
		<NavItem type="asset" idx={idx} icon={asset.typeId} id={asset.id} color={asset.color} />
	);
	const navTabs = tabs.map((tab, idx) =>
		<NavItem type="tab" idx={idx} item={tab.text} icon={tab.icon} id={tab.icon} key={tab.key} />
	);
	return (
		<div id="main" className="dark">
			<Errors/>
			<Button onClick={ e => { auth.logout() }} style={{ "float": "right" }}>Logout</Button>
			<h1>BKD Coin Exchange</h1>
			<div className="content">
			<div id="chart">
				<NavList className="navlist buttonlist right" onNavClick={handleNavClick}>
					{navAssets}
				</NavList>
				<div className="container">
					<LineChart curve={false} data={trades} colors={[ "#0F0", "#AAA"]} prefix="$" />
				</div>
			</div>
			
			<BidAskForm assets={assets}/>
			
			<NavList className="navlist tab-bottom" onNavClick={handleNavClick}>
				{navTabs}
			</NavList>
		</div>
		</div>
	)
}

export default CoinExchange;
