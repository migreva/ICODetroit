import React from 'react';
import marked from 'marked';

class BlogPostJsx extends React.Component {
  constructor(args) {
    super(args);

    this.parseArticle(args.article);
  }

  parseArticle(article) {
    this.article = article;
    this.content = article.content;//marked(article.content.toString(), {sanitize: true});
    this.title = article.title;
    this.author = article.author;
    this.url = article.url;
    this.author = article.author.displayName;
    this.labels = article.labels;

    // Format the date
    let date = new Date(article.published);
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
        <div className='content' dangerouslySetInnerHTML={{__html: this.content}}/>
        <div className='author'>
          By { this.author }
        </div>
        <div className='labels'>
          { this.labels.map(this.renderLabels) }
        </div>
      </div>
    )
  }
}

module.exports = BlogPostJsx
