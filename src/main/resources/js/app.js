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
			actions: [ "chart", "bidask" ],
			events: { actionClick: this.onActionClick, assetClick: this.onAssetClick }
		};
		this.onActionClick = this.onActionClick.bind(this);
		this.onAssetClick = this.onAssetClick.bind(this);
	}
	onActionClick() {
		console.log("action click");
	}
	onAssetClick() {
		console.log("asset click");
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
			<NavItem idx={idx} item={asset.name} />
		);
		return (
			<div id="main">
				<NavList>
					{navItems}
					<NavList style={{ float: "right"}}>
					
					</NavList>
				</NavList>
				<div id="chart">
					<LineChart curve={false} data={this.state.trades} />
				</div>
				<div id="bidask" style={{display: "none"}}>
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

