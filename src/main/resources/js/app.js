'use strict';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

import NavList, { NavItem } from './comp/nav.js';
import BidAskForm from './comp/bidask-form.js';

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
			tabs: [ { text: "Chart", icon: "chart"} , { text: "Buy/Sell", icon: "bidaskform" }],
		};
	}
	
	handleNavClick(item) {
		console.log("nav click:" + JSON.stringify(item));
		if (item.icon) {
			for (var x=0; x<this.state.tabs.length; x++) {
				var disp = item.icon == this.state.tabs[x].icon ? "block" : "none";
				document.getElementById(this.state.tabs[x].icon).style.display = disp;
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
		}).then(response => {
			var trades = response.entity._embedded.userTrades;
			this.setState({trades: trades.map(t => [new Date(t.fillDate),t.value]) });
		});
	}

	render() {
		const navItems = this.state.assets.map((asset, idx) =>
			<NavItem idx={idx} item={asset.name} id={asset.id} />
		);
		const navIcons = this.state.tabs.map((tab, idx) =>
			<NavItem idx={idx} item={tab.text} icon={tab.icon} id={tab.icon} />
		);
		return (
			<div id="main">
				<div id="chart">
					<NavList className="navlist tab-top" onNavClick={this.handleNavClick.bind(this)}>
						{navItems}
					</NavList>
					<div className="container">
						<LineChart curve={false} data={this.state.trades} colors={[ "#0F0", "#AAA"]} prefix="$" 
							/>
					</div>
				</div>
				
				<BidAskForm assets={this.state.assets}/>
				
				<NavList className="navlist tab-bottom" onNavClick={this.handleNavClick.bind(this)}>
					{navIcons}
				</NavList>
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)

