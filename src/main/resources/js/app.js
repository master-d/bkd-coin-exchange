'use strict';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
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
	}

	render() {
		return (
			<AssetList assets={this.state.assets}/>
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
			<table>
				<tbody>
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>Description</th>
					</tr>
					{assets}
				</tbody>
			</table>
		)
	}
}
// end::asset-list[]

// tag::asset[]
class Asset extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.asset.id}</td>
				<td>{this.props.asset.name}</td>
				<td>{this.props.asset.description}</td>
			</tr>
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

