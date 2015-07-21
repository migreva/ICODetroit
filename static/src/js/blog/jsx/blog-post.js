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
    this.link = article.selfLink;
    this.author = article.author.displayName;

    // Format the date
    let date = new Date(article.published);
    this.published = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
  }

  render() {
    return (
      <div className='blog-post'>
        <div className='header'>
          <div className='title'>
            <a href={ this.link }>{ this.title }</a>
          </div>
          <div className='date'>
            <a href={ this.link }>{ this.published }</a>
          </div>
        </div>
        <div className='author'>
          By { this.author }
        </div>
        <div className='content' dangerouslySetInnerHTML={{__html: this.content}}/>
      </div>
    )
  }
}

module.exports = BlogPostJsx
