import React from 'react';

class Project extends React.Component {
  constructor(args) {
    super(args)
  }
}

class BrotherBear extends Project {
  constructor(args) {
    super(args)
  }

  render() {
    return (
      <div className='project-summary brother-bear'>
        <div className='title'>Brother Bear</div>
        <div className='content'>
          <div className='write-up'>
            <p>We all have that stuffed animal, the best friend given to us in our youth.</p>
            <p>Local artists will create artwork that will uplift children through love and creativity by adding a little artistic sunshine to their lives.</p>
            <p>Poetry, paintings, short stories, songs, illustrations, and other uplifting imagery will showcase inspiring messages for children to have in fostering hope and building positive character.</p>
          </div>
        </div>
      </div>
    )
  }
}

class BoardAndBeautify extends Project {
  constructor(args) {
    super(args)

  }

  render() {
    return (
      <div className='project-summary board-and-beautify'>
        <div className='title'>Detroit Board And Beautify</div>
        <div className='content'>
          <div className='write-up'>
            <p>Blight has hit Detroit hard.</p>
            <p>Detroit Board and Beautify brings together local artists to put a creative spin on the practice of boarding up blighted homes. Artists will use wooden boards as a canvas for painting, stenciling, and drawing empowering artwork that will replace broken and missing windows and doors.</p>
          </div>
          <div className='kickstarter-embed'>
            <iframe frameBorder='0' height='420' scrolling='no' src='https://www.kickstarter.com/projects/878320897/detroit-board-and-beautify/widget/card.html?v=2' width='220'></iframe>
          </div>
        </div>
      </div>

    )
  }
}

module.exports = {
  BrotherBear,
  BoardAndBeautify
}
