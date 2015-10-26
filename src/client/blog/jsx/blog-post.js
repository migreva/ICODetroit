import React from 'react';
import marked from 'marked';

export default class BlogPostJsx extends React.Component {
  constructor(args) {
    super(args);

    this.parseArticle(args.post);
  }

  parseArticle(post) {
    this.post = post;
    this.content = post.content;//marked(post.content.toString(), {sanitize: true});
    this.title = post.title;
    this.author = post.author;
    this.url = post.url;
    this.author = post.author.displayName;
    this.labels = post.labels || [];

    // Format the date
    let date = new Date(post.published);
    this.published = `${date.getMonth()}.${date.getDate()}.${String(date.getFullYear()).slice(2, 4)}`;
  }

  renderLabels(label, index) {

    return (
      <div className='label'>{ label }</div>
    )
  }

  render() {
    return (
      <div className='blog-post'>
        <div className='header'>
          <div className='title'>
            { this.title }
          </div>
          <div className='date'>
            { this.published }
          </div>
        </div>
        <div className='blog-content' dangerouslySetInnerHTML={{__html: this.content}}/>
        <div className='author'>
          By { this.author }
        </div>
        <div className='labels'>
          { this.labels.map(this.renderLabels) }
        </div>
        <hr/>
      </div>
    )
  }
}
