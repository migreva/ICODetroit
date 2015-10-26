import React from 'react';
import Velocity from 'velocity-animate';

export default class Navbar extends React.Component {

  constructor() {
    super();
    this.state = {
      menuHidden: true,
      menuAnimating: false
    }
  }

  toggleMenu() {
    if (this.state.menuAnimating) return;

    this.setState({
      menuHidden: !this.state.menuHidden,
      menuAnimating: true
    });
  }

  componentDidUpdate() {
    if (this.state.menuAnimating) this.animatePageNav();
  }

  animatePageNav() {
    let nodes = document.getElementsByClassName('nav-item');
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      let opacity = this.state.menuHidden? 0 : 1;
      console.log(opacity);
      Velocity(node, {
        opacity
        //opacity: 1,
      }, {
        duration: 500,
        delay: i * 50,
        complete: () => {
          this.setState({
            menuAnimating: false
          });
        }
      })
    }
  }

  render() {


    let navState = this.state.menuAnimating || !this.state.menuHidden ? 'navbar' : 'navbar hidden';
    return (
      <div className={ navState }>
        <div className='menu-toggle' onClick={ this.toggleMenu.bind(this) }>Menu <i className='fa fa-caret-up'></i><i className='fa fa-caret-down'></i></div>
        <div className='pages'>
          <a href='/blog/' className='nav-item blog'>Blog</a>
          <a href='/about/' className='nav-item about'>About</a>
          <a href='/calendar/' className='nav-item calendar'>Calendar</a>
          <a href='/projects/' className='nav-item projects'>Projects</a>
          <a href='/get-involved/' className='nav-item get-involved'>Get Involved</a>
          <a href='/' className='nav-item home'>Home</a>
        </div>
      </div>
    )
  }
}
