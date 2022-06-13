import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>HackIllinois</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

		<Leaderboard />
      </div>
    );
  }
}

class Leaderboard extends Component {
	constructor(props) {
		super(props);
		this.state = { dataReceived: [], value: 0 };
		// this.props.data.dataReceived = [];
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	// on load, get the information
	//state.dataReceived = [];

	// getInitialState() {
	// 	return {
	// 		dataReceived: []
	// 	}
	// }

	handleChange(event) {
		this.setState({value: event.target.value});
		this.serverRequest = axios.get('https://api.hackillinois.org/profile/leaderboard/', {params:{limit : event.target.value }})
		.then((result) => {
			this.setState({
				dataReceived: result.data.profiles
			});
		});
	  }
	
	handleSubmit(event) {
		alert('A value was submitted: ' + this.state.value);
		event.preventDefault();
	  }



	// componentWillUnmount() {
	// 	this.serverRequest.abort();
	// }


	render() {
		return(

		<div>
		<form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        {/* <input type="submit" value="Submit" /> */}
      </form>
			
		<table className="Leaderboard">

			<tr>
				<td>Leaderboard</td>
			</tr>

			<tr>
				{this.state.dataReceived.map(function(camper) {
					return (
						<tr className="Camper">
							<td>Username: {camper.discord}</td>
							<td>Points: {camper.points}</td>
						</tr>
					);
				})
				}
			</tr>
		</table>
		</div>
		)
	}
}


export default App;
