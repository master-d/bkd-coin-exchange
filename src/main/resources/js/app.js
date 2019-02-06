'use strict';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

import { FaBitcoin, FaComments, FaCommentsDollar, FaDollarSign, FaChartLine } from 'react-icons/fa';

import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';
ReactChartkick.addAdapter(Chart);
// end::vars[]

// tag::app[]
class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {assets: [], trades: []};
	}
// /api/userTrades/search/findByAssetIdAndFillDateIsNotNull
	componentDidMount() {
		client({method: 'GET', path: '/api/assets'}).done(response => {
			this.setState({assets: response.entity._embedded.assets});
		});
		client({method: 'GET'
			,path: '/api/userTrades/search/findByAssetIdAndFillDateIsNotNull?assetId=1'
			,data: {assetId: 1}})
		.done(response => {
			var trades = response.entity._embedded.userTrades;
			this.setState({trades: trades.map(t => [new Date(t.fillDate),t.value]) });
		});
	}

	render() {
		return (
			<div id="main">
				<NavBar assets={this.state.assets} actions={["chart","bidask"]}/>
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

// tag::asset-list[]
class NavBar extends React.Component{
	showSection(e) {
		var actionId = e.target.dataset.actionid;
		for (var x=0; x<this.props.actions.length; x++) {
			var action = this.props.actions[x];
			var shide = action == actionId ? "block" : "none";
			document.getElementById(actionId).style.display = shide;
		}
		
	};
	render() {
		const assets = this.props.assets.map((asset,idx) =>
			<Asset type="li" key={asset._links.self.href} asset={asset} idx={idx} />
		);
		const actions = this.props.actions.map((actionId,idx) => {
			if (actionId == "chart")
				return <a href="#" data-actionid={actionId} onClick={this.showSection.bind(this)}><FaChartLine/></a>
			else if (actionId == "bidask")
				return <a href="#" data-actionid={actionId} onClick={this.showSection.bind(this)}><FaBitcoin/></a>
		});
		return (
			<div id="navbar">
				<div className="icon-links" style={{ float: "right"}}>
					{actions}
				</div>
				<ul>
					{assets}
				</ul>
			</div>
		)
	}
}
// end::asset-list[]

// tag::asset[]
class Asset extends React.Component{
	constructor(props) {
		super(props);
		this.state = { selected: 0 };
	}
	loadChartForAsset() {
		this.state.selected = this.props.idx;
		console.log(this.state.selected);
	}
	render() {
		if (this.props.type == "li") {
			var className = this.state.selected == this.props.idx ? "selected" : null;
			return (
				<li onClick={this.loadChartForAsset.bind(this)}	className={className}>
					<a href="#" data-id={this.props.asset.id}>{this.props.asset.name}</a>
				</li>
			)
		} else {
			return (
				<option value={this.props.asset.id}>{this.props.asset.id}</option>
			)
		}
	}
}

class BidAskForm extends React.Component{
	constructor(props) {
		super(props);
		this.state = { tradeTypes: [] };
	}
	componentDidMount() {
		client({method: 'GET', path: '/api/tradeTypes'}).done(response => {
			this.setState({tradeTypes: response.entity._embedded.tradeTypes});
		});
	}
	render() {
		const assets = this.props.assets.map((asset,idx) =>
		<Asset type="ddl" key={asset._links.self.href} asset={asset} idx={idx} />
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

