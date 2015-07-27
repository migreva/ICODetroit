import Navbar from './navbar';
import React from 'react';

class Subpage {
  constructor() {
    this.init();
  }

  init() {
    // Navbar
    React.render(
      <Navbar/>,
      document.getElementById('navbar')
    )
  }

}

var s = new Subpage();

module.exports = s;
