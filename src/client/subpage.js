import React from 'react';

import Navbar from './lib/navbar';

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
