'use strict';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

import NavList, { NavItem } from './comp/nav.js';

import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';
ReactChartkick.addAdapter(Chart);
// end::vars[]

// tag::app[]
class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			assets: [], 
			trades: [],
			icons: [ "chart", "bidaskform" ],
		};
	}
	
	handleNavClick(item) {
		console.log("nav click:" + JSON.stringify(item));
		if (item.icon) {
			for (var x=0; x<this.state.icons.length; x++) {
				var disp = item.icon == this.state.icons[x] ? "block" : "none";
				document.getElementById(this.state.icons[x]).style.display = disp;
			}
		}
	}
// /api/userTrades/search/findByAssetIdAndFillDateIsNotNull
	componentDidMount() {
		client({method: 'GET', path: '/api/assets'}).then(response => {
			this.setState({assets: response.entity._embedded.assets});
		});
		client({method: 'GET'
			,path: '/api/userTrades/search/findByAssetIdAndFillDateIsNotNull?assetId=1'
			,data: {assetId: 1}}).then(response => {
			var trades = response.entity._embedded.userTrades;
			this.setState({trades: trades.map(t => [new Date(t.fillDate),t.value]) });
		});
	}

	render() {
		const navItems = this.state.assets.map((asset, idx) =>
			<NavItem idx={idx} item={asset.name} id={asset.id} />
		);
		const navIcons = this.state.icons.map((icon, idx) =>
			<NavItem idx={idx} icon={icon} id={icon} />
		);
		return (
			<div id="main">
				<NavList onNavClick={this.handleNavClick.bind(this)}>
					{navItems}
					<NavList className="icon-links" onNavClick={this.handleNavClick.bind(this)}>
					{navIcons}
					</NavList>
				</NavList>
				<div id="chart">
					<LineChart curve={false} data={this.state.trades} />
				</div>
				<div id="bidaskform" style={{display: "none"}}>
					<BidAskForm assets={this.state.assets}/>
				</div>
			</div>
		)
	}
}
// end::app[]


class BidAskForm extends React.Component{
	constructor(props) {
		super(props);
		this.state = { tradeTypes: [] };
	}
	componentDidMount() {
		client({method: 'GET', path: '/api/tradeTypes'}).then(response => {
			this.setState({tradeTypes: response.entity._embedded.tradeTypes});
		});
	}
	render() {
		const assets = this.props.assets.map((asset,idx) =>
		<option key={asset._links.self.href} value={asset.id}>{asset.name}</option>
	);
		return (
			<form id="bidask-form" onSubmit={ this.handleSubmit }>
				<div>
					<select name="asset_id">
						<option value="">- Asset Type -</option>
						{assets}
					</select>
					<input type="number" placeholder="value" name="value" />
					<input type="number" name="quantity" defaultValue="1"/>
				</div>
			</form>
		)
	}
}
// end::asset[]

// tag::render[]
ReactDOM.render(
	<App />,
	document.getElementById('react')
)
// end::render[]

