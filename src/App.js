import React, { Component } from 'react';
import { CardList } from './components/card-list/card-list.component';
import './App.css';
import { SearchBox } from './components/search-box/search-box.component';
class App extends Component {
	constructor() {
		super();
		this.state = {
			monsters: [],
			searchField: '',
			searchEmail: ''
		};
	}
	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((res) => res.json())
			.then((res) => this.setState({ monsters: res }));
	}
	handleChange = (e) => {
		this.setState({ searchField: e.target.value });
	};
	render() {
		const { monsters, searchField, searchEmail } = this.state;
		const filteredMonsters = monsters.filter((monster) =>
			monster.name.toLowerCase().includes(searchField.toLowerCase())
		);
		const filterEmail = filteredMonsters.filter((monster) =>
			monster.email.toLowerCase().includes(searchEmail.toLowerCase())
		);

		return (
			<div className="App">
				<h1>Monsters Rolodex</h1>
				<SearchBox placeholder="search monsters" handleChange={this.handleChange} />
				<SearchBox
					placeholder="search email"
					handleChange={(e) => this.setState({ searchEmail: e.target.value })}
				/>

				<CardList monsters={filterEmail} />
			</div>
		);
	}
}
export default App;
