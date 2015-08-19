import React from 'react';

class Project extends React.Component {
  constructor(args) {
    super(args)

    this.summaryClass = 'default';
  }

  renderSummary() {
   return;
  }

  render() {
    return(
      <div className={ `project-summary ${this.summaryClass}` }>
        <i className='fa fa-times close-summary'></i>
        { this.renderSummary() }
      </div>
    )
  }
}

class BrotherBear extends Project {
  constructor(args) {
    super(args);

    this.summaryClass = 'brother-bear';
  }

  renderSummary() {
    return (
      <div>
        <div className='title'>Brother Bear</div>
        <div className='content'>
          <div className='write-up'>
            <p>Pinky, Angel Pup, Boo Bear, and Bunny- we all have that stuffed animal, the best friend given to us in our youth. Through all the icky times and sick days, our stuffies were there, sometimes being all you needed to cure a bad day. Which is why ICO is bringing to the little ones of Detroit, The Brother Bear Project.</p>
            <p>Local artists will create artwork that will uplift children through love and creativity by adding a little artistic sunshine to their lives. Pairing donated stuffed animals with amazing creatives, The Brother Bear Project will offer children a chance to have not only a cuddly friend for times of need, but a piece of their community,  Detroit’s culture, and some pretty cool art as well.</p>
            <p>Poetry, paintings, short stories, songs, illustrations, and other uplifting imagery will showcase inspiring messages for children to have in fostering hope and building positive character.</p>
          </div>
          <div className='image'>
            <img src='/img/brotherbear2.jpeg'/>
          </div>
        </div>
      </div>
    )
  }
}

class BoardAndBeautify extends Project {
  constructor(args) {
    super(args);

    this.summaryClass = 'board-and-beautify';
  }

  renderSummary() {
    return (
      <div>
        <div className='title'>Detroit Board And Beautify</div>
        <div className='content'>
          <div className='write-up'>
            <p>Blight has hit Detroit hard.</p>
            <p>Everyday children walking to school are faced with the aftermath of the economic downturn of an entire region, walking for blocks by vacant houses and buildings, but with little power to change their environment. The city of Detroit is in the process of demolishing many of the blighted properties that blanket its landscape, but for many residents of the city the progress is not fast enough.</p>
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
