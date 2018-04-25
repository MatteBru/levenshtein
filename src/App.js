import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Pokemon from './Pokemon';
import Search from './Search';

class App extends Component {
  state = {
    pokemans: [],
    searchString: ''
  }

  componentDidMount() {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=251').then(res => res.json()).then(json => this.setState({pokemans: json.results}))
  }

  handleChange = (e) => {
    console.log(e);
    this.setState({searchString: e.target.value});
  }

  filterPokemon = () => {
    // let filtered = this.state.pokemans.filter(p => (p.name.slice(0, this.state.searchString.length) === this.state.searchString))
    // return filtered;
    let filtered = this.state.pokemans.filter(p => (this.LevenshteinDist(p.name, this.state.searchString) === 0))
    console.log(filtered);
    return filtered;
  }

  LevenshteinDist = (a,b) => {
    if(a.length === 0 || b.length === 0){
      return Math.abs(a.length - b.length)
    }
    // let matrix = [[...Array(a.length + 1).keys()], ...[Array(b.length + 1).keys().slice(1)]];
    let matrix = [[...Array(b.length + 1).keys()], ...[...Array(a.length + 1)].map((e, i) => ([i]) ).slice(1)];

    // debugger;


    for(let i = 1; i < a.length + 1; i++){
      for(let j = 1; j < b.length + 1; j++){
        if (a[i - 1] === b[j - 1]){
          matrix[i][j] = matrix[i - 1][j - 1]
        }else{
          matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + 2);
        }
        console.log(a[i - 1], b[j - 1], matrix[i][j]);
      }
    }
    return matrix[a.length][b.length];
  }



  render() {
    console.log(this.state);
    console.log(this.LevenshteinDist('industry', 'interest'));
    const pokemon = this.filterPokemon().map(p => (<Pokemon key={p.url} guy={p}/>))
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Search value={this.state.searchString} handleChange={this.handleChange}/>
        <ul>
          {pokemon}
        </ul>
      </div>
    );
  }
}

export default App;
