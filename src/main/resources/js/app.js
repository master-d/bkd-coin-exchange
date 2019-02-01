'use strict';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';
ReactChartkick.addAdapter(Chart);
// end::vars[]

// tag::app[]
class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {assets: []};
	}

	componentDidMount() {
		client({method: 'GET', path: '/api/assets'}).done(response => {
			this.setState({assets: response.entity._embedded.assets});
		});
		client({method: 'GET', path: '/api/userTrades'}).done(response => {
			var chartdata = [];
			var trades = response.entity._embedded.userTrades;
			for (var x=0; x<trades.length; x++) {
				chartdata.push([new Date(trades[x].fillDate),trades[x].value]);
			}
			this.setState({trades: chartdata});
		});
	}

	render() {
		return (
			<div>
				<AssetList assets={this.state.assets}/>
				<LineChart curve={false} data={this.state.trades} />" +
			</div>
		)
	}
}
// end::app[]

// tag::asset-list[]
class AssetList extends React.Component{
	render() {
		const assets = this.props.assets.map(asset =>
			<Asset key={asset._links.self.href} asset={asset}/>
		);
		return (
				<span>
			{assets}
				</span>
		)
	}
}
// end::asset-list[]

// tag::asset[]
class Asset extends React.Component{
	render() {
		return (
			<button id={this.props.asset.id}>{this.props.asset.name}</button> 
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

