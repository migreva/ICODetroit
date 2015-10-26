import React from 'react';

import projectJsx from './projects/jsx/projects';
import Subpage from './subpage';

let projectInfo = {
  'board-and-beautify': {
    jsx: projectJsx.BoardAndBeautify,
    name: 'Board and Beautify'
  },
  'brother-bear': {
    jsx: projectJsx.BrotherBear,
    name: 'Brother Bear'
  }
}

class Projects extends React.Component {
  constructor(args) {
    super(args);

    this.state = {
      projectShow: false,
      projectName: ''
    }
  }

  showSummary(projectName) {
    if (!(projectName in projectInfo)) return;

    document.getElementsByTagName('body')[0].classList.add('project-summary-shown');

    this.setState({
      projectShow: true,
      projectName
    });
  }

  closeSummary(e) {
    if (!/summary-container|close-summary/.test(e.target.classList)) {
      return;
    }

    document.getElementsByTagName('body')[0].classList.remove('project-summary-shown');
    this.setState({
      projectShow: false,
      projectName: ''
    });
  }

  renderProjects() {
    let returnHtml = [];
    for (let projectName in projectInfo) {

      let project = projectInfo[projectName];
      let className = `project ${projectName}`;
      returnHtml.push((
        <div className={ className }>
           <div className='project-title'>{ project.name }</div>
           <div className='see-more' onClick={ this.showSummary.bind(this, projectName) }>See More</div>
           <div className='overlay'></div>
        </div>
      ));
    }
    return returnHtml;
  }

  renderSummary() {
    if (!this.state.projectShow || !this.state.projectName) return;

    let jsx = projectInfo[this.state.projectName].jsx;
    return (
      <div className='summary-container' onClick={ this.closeSummary.bind(this) }>
        { React.createElement(jsx, { callback: this.closeSummary.bind(this) }) }
      </div>
    )
  }

  render() {
    return (
      <div className='projects'>
        { this.renderProjects() }
        { this.renderSummary() }
      </div>
    )
  }
}

let projects = React.render(
  <Projects projects={ projectInfo }/>,
  document.getElementById('projects')
)
