import React from 'react';
import BlogPost from './blog-post';

export default class Blog extends React.Component {
  constructor(args) {
    super(args);

    this.parsePosts();
    this.appliedFilters = [];
  }

  parsePosts() {
    this.possibleFilters = [];
    this.filterIndex = {};
    for (let post of this.props.posts) {
      for (let label of post.labels) {
        if (!(label in this.filterIndex)) {
          label = label.toLowerCase();
          this.possibleFilters.push({
            tag: label,
            count: 0
          });
          this.filterIndex[label] = this.possibleFilters.length - 1;
        }

        let index = this.filterIndex[label];
        this.possibleFilters[index].count += 1;
      }
    }

    this.possibleFilters.sort(function(a, b) {
      return a.count - b.count;
    });
  }

  renderBlogPost(post, index) {
    return (
      <BlogPost post={ post }/>
    )
  }

  renderAvailableFilter(filter, index) {
    return (
      <Filter tag={ filter.tag } count={ filter.count }/>
    )
  }

  render() {
    return (
      <div className='blog'>
        <div className='filters'>
          { this.possibleFilters.map(this.renderAvailableFilter) }
        </div>
        { this.props.posts.map(this.renderBlogPost) }
      </div>
    )
  }
}

class Filter extends React.Component {
  constructor(args) {
    super(args);
  }

  render() {
    return (
      <div className='available-filter'>{ this.props.tag }</div>
    )
  }
}
