import React from 'react';
import marked from 'marked';

class BlogPostJsx extends React.Component {
  constructor(args) {
    super(args);

    this.parseArticle(args.article);
  }

  parseArticle(article) {
    this.article = article;
    this.published = article.published;
    this.content = marked(article.content.toString(), {sanitize: true});
    this.title = article.title;
    this.author = article.author;
  }

  render() {
    return (
      <div className='blog-post'>
        <div className='date'>
          { this.published }
        </div>
        <div className='title'>
          { this.title }
        </div>
        <div className='content' dangerouslySetInnerHTML={{__html: this.content}}>
        </div>
      </div>
    )
  }
}

module.exports = BlogPostJsx