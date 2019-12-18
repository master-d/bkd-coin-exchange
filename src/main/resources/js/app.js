'use strict';

import React, { useState, useEffect } from 'react';
import ReactDOM  from 'react-dom';


import NavList, { NavItem } from './comp/nav.js';
import BidAskForm from './comp/bidask-form.js';

import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';
ReactChartkick.addAdapter(Chart);


const App = () => {

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
			setErrors(response);
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
				setErrors(response);
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

ReactDOM.render(
	<App />,
	document.getElementById('react')
)

