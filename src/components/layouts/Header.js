import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper green" >
          <a href="/" className="brand-logo center">React Calendar App</a>
        </div>
      </nav>
    )
  }
}
export default Header;
