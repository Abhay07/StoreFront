import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import cartImg from './../../assets/images/cart.png';

class Header extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="header">
      	<Link to="/" className="resetLinkCss">
              Home
          </Link>
      	<div>
      		<Link to="/cart">
      			<div className="cartContainer">
      				<img src={cartImg} className="cartIcon"/>
      			</div>
      		</Link>
      	</div>
      </div>
    );
  }
}

export default Header;
