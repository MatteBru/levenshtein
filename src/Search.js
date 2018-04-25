import React, { Component } from 'react';

class Search extends Component {



  render(){
    return <input value={this.props.searchString} onChange={this.props.handleChange} type='text'></input>
  }
}


export default Search;
