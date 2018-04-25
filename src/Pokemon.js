import React, { Component } from 'react';

const Pokemon = (props) => {
  // console.log(props);
  return (
    <li onClick={(e) => {alert(props.guy.url)}} > {props.guy.name} </li>
  );
}


export default Pokemon;
