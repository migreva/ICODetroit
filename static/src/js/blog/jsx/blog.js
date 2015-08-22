import React from 'react';
import { union } from 'lodash';
import BlogPost from './blog-post';
import TagStore from '../store/tags';

var tagStore = new TagStore();

export default class Blog extends React.Component {
  constructor(args) {
    super(args);

    this.appliedFilters = [];
    this.state = {
      posts: this.parsePosts(this.props.posts)
    }
  }

  /**
   * Parse the posts and return an array of posts
   */
  parsePosts(posts) {
    for (let post of posts) {
      for (let tagString of post.labels) {
        tagStore.addTag(tagString);
      }
    }
    tagStore.addTag('not a real tag');

    return posts;
  }

  filterChange() {
    let posts = this.props.posts;
    let filters = tagStore.getActiveTags();
    this.setState({
      posts: this.filterPosts_(posts, filters)
    })
  }

  filterPosts_(posts, filters) {
    if (!filters.length) return posts;

    let filteredPosts = [];
    for (let post of posts) {

      let validPost = true;
      for (let filter of filters) {
        if (post.labels.indexOf(filter.toString()) < 0) {
          validPost = false;
          break;
        }
      }

      if (validPost) filteredPosts.push(post);
    }

    return filteredPosts;
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
        <Filters filterCallback={ this.filterChange.bind(this) }/>

        <div className='blog-posts'>
          { this.state.posts.map(this.renderBlogPost) }
        </div>
      </div>
    )
  }
}

class Filters extends React.Component {
  constructor(args) {
    super(args);

    this.state = {
    }
  }

  selectFilter(filterString) {
    tagStore.activateTag(filterString);
    this.setState({
      filterSelect: true,
    });
    if (this.props.filterCallback) this.props.filterCallback();
  }

  removeFilter(filterString) {
    tagStore.deactivateTag(filterString);
    this.setState({
      filterRemove: true
    });
    if (this.props.filterCallback) this.props.filterCallback();
  }

  /**
   * @param {Tag} filter
   */
  renderActiveFilter(filter, index) {
    let filterString = filter.toString();
    return (
      <div className='filter active'>
        { filterString }
        <div className='remove-filter'
          onClick={ this.removeFilter.bind(this, filterString) }>
            X
        </div>
      </div>
    )
  }

  /**
   * @param {Tag} filter
   */
  renderAvailableFilter(filter, index) {
    let filterString = filter.toString();
    return (
      <div className='filter available'
        onClick={ this.selectFilter.bind(this, filterString) }>
          { filterString }
      </div>
    )
  }

  render() {
    return (
      <div className='filters'>
        <div className='active-filters'>
          { tagStore.getActiveTags().map(this.renderActiveFilter.bind(this)) }
        </div>
        <div className='available-filters'>
          { tagStore.getInactiveTags().map(this.renderAvailableFilter.bind(this)) }
        </div>
      </div>
    )
  }
}

