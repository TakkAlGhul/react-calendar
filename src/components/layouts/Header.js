import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper green" >
          <a href="/" className="brand-logo center">Simple Calendar</a>
        </div>
      </nav>
    )
  }
}
export default Header;
