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
          <a href='/blog/' className='nav-item blog'>blog</a>
          <a href='/about/' className='nav-item about'>about</a>
          <a href='/calendar/' className='nav-item calendar'>calendar</a>
          <a href='/projects/' className='nav-item projects'>projects</a>
          <a href='/' className='nav-item home'>home</a>
        </div>
      </div>
    )
  }
}
